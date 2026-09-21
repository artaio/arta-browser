import { isPayInboundMessage, parseResizeHeight } from './messaging';
import { DEFAULT_PAY_ORIGIN, type PayPosition } from './payConfig';
import type { InfoFullConfig, InfoInput } from './infoConfig';

// Arta Pay CTA info modal: a login-free marketing modal opened on demand via
// `Arta.openArtaPayInfoModal()`. Unlike the checkout modal it has no purchase
// request, no client token and no handshake — it mounts on `open()`, shows
// immediately, and only listens for the iframe's resize/close reports. Every
// message is accepted only from the iframe this modal created.

const OVERLAY_ID = 'arta-pay-info-overlay';
const FRAME_MIN_HEIGHT_PX = 240;
const RESIZE_DEAD_BAND_PX = 2;

const overlayBaseCss =
  'box-sizing:border-box;position:fixed;inset:0;display:flex;background:rgba(17,15,16,0.55);' +
  'z-index:2147483000;visibility:hidden;pointer-events:none;';

const overlayPositionCss: Record<PayPosition, string> = {
  center: 'align-items:center;justify-content:center;',
  full_screen: 'align-items:stretch;justify-content:stretch;',
  left: 'align-items:stretch;justify-content:flex-start;',
  right: 'align-items:stretch;justify-content:flex-end;',
};

const frameBaseCss =
  'box-sizing:content-box;border:0;background:#fff;transition:height 0.15s ease;';

// The centered card opens on the height the info view will actually report,
// so the frame never resizes once the iframe measures itself. The view has two
// heights: the plain CTA, and the taller one that carries a financing estimate
// (rendered only when a total price is supplied). Keep in step with
// #arta-pay-info .arta-pay-shell in the widget's CSS.
const CENTER_HEIGHT_PX = 412;
const CENTER_WITH_ESTIMATE_HEIGHT_PX = 753;

const framePositionCss = (
  centerHeightPx: number
): Record<PayPosition, string> => ({
  center:
    `width:min(576px, calc(100vw - 32px));height:min(${centerHeightPx}px, calc(100vh - 32px));` +
    'border:1px solid #d2d2d2;border-radius:8px;' +
    'box-shadow:0 24px 64px rgba(17,15,16,0.35);',
  full_screen: 'width:100vw;height:100vh;',
  left:
    'width:min(460px, 100vw);height:100vh;border-right:1px solid #d2d2d2;' +
    'box-shadow:24px 0 64px rgba(17,15,16,0.35);',
  right:
    'width:min(460px, 100vw);height:100vh;border-left:1px solid #d2d2d2;' +
    'box-shadow:-24px 0 64px rgba(17,15,16,0.35);',
});

export default class InfoModal {
  public isOpen = false;

  private overlay: HTMLDivElement | undefined;
  private iframe: HTMLIFrameElement | undefined;
  private destroyed = false;
  private lastFrameHeight: number | undefined;
  private readonly payOrigin: string;
  private readonly messageListener = (event: MessageEvent) =>
    this.handleMessage(event);
  private readonly keydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  constructor(
    private readonly input: InfoInput,
    private readonly config: InfoFullConfig
  ) {
    this.payOrigin = config.payOrigin ?? DEFAULT_PAY_ORIGIN;
  }

  public open(): void {
    if (this.destroyed) {
      throw new Error('This Arta Pay info modal has been destroyed');
    }
    if (!this.overlay) {
      this.mount();
    }
    this.reveal();
  }

  // Hides the overlay without tearing down the iframe, so a later `open()`
  // shows it again instantly.
  public close(): void {
    if (this.overlay) {
      this.overlay.style.visibility = 'hidden';
      this.overlay.style.pointerEvents = 'none';
    }
    document.removeEventListener('keydown', this.keydownListener);
    this.isOpen = false;
  }

  public destroy(): void {
    this.close();
    window.removeEventListener('message', this.messageListener);
    this.overlay?.remove();
    this.overlay = undefined;
    this.iframe = undefined;
    this.destroyed = true;
  }

  private mount(): void {
    if (this.destroyed || this.overlay || !document.body) {
      return;
    }

    window.addEventListener('message', this.messageListener);

    const position = this.config.position;

    this.overlay = document.createElement('div');
    this.overlay.id = OVERLAY_ID;
    this.overlay.style.cssText = overlayBaseCss + overlayPositionCss[position];
    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay) {
        this.close();
      }
    });

    this.iframe = document.createElement('iframe');
    this.iframe.style.cssText =
      frameBaseCss + framePositionCss(this.centerHeightPx())[position];
    this.iframe.setAttribute('title', 'Arta Pay');
    this.iframe.src = this.frameSrc();

    this.overlay.appendChild(this.iframe);
    document.body.appendChild(this.overlay);
  }

  // The estimate is what makes the view taller, and it is rendered exactly when
  // a total price rides the URL, so the same condition picks the opening height.
  private centerHeightPx(): number {
    return this.input.totalPrice === undefined
      ? CENTER_HEIGHT_PX
      : CENTER_WITH_ESTIMATE_HEIGHT_PX;
  }

  // The public key is an identifier, not a credential; the optional total price
  // only drives a financing estimate. Both ride the URL because the info modal
  // has no postMessage handshake.
  private frameSrc(): string {
    let src =
      this.payOrigin +
      '/artapay-widget/info?pk=' +
      encodeURIComponent(this.config.apiKey);
    if (this.input.totalPrice !== undefined) {
      src +=
        '&total_price=' + encodeURIComponent(String(this.input.totalPrice));
    }
    return src;
  }

  private reveal(): void {
    if (!this.overlay) {
      return;
    }
    this.overlay.style.visibility = 'visible';
    this.overlay.style.pointerEvents = 'auto';
    document.addEventListener('keydown', this.keydownListener);
    this.isOpen = true;
  }

  private handleMessage(event: MessageEvent): void {
    if (
      event.origin !== this.payOrigin ||
      !this.iframe ||
      event.source !== this.iframe.contentWindow ||
      !isPayInboundMessage(event.data)
    ) {
      return;
    }

    const data = event.data;
    if (data.type === 'arta-pay:resize') {
      this.handleResize(data);
    } else if (data.type === 'arta-pay:close') {
      this.close();
    }
  }

  private handleResize(data: unknown): void {
    // Side panels and full screen keep the whole viewport height.
    if (this.config.position !== 'center' || !this.iframe) {
      return;
    }
    const height = parseResizeHeight(data);
    if (height === undefined) {
      return;
    }
    const px = Math.max(FRAME_MIN_HEIGHT_PX, Math.round(height));
    if (
      this.lastFrameHeight !== undefined &&
      Math.abs(px - this.lastFrameHeight) < RESIZE_DEAD_BAND_PX
    ) {
      return;
    }
    this.lastFrameHeight = px;
    this.iframe.style.height = `min(${px}px, calc(100vh - 32px))`;
  }
}
