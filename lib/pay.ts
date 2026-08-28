import {
  isPayInboundMessage,
  parseCloseReason,
  parseCompletion,
  parseError,
  parseResizeHeight,
  type PayOutboundMessage,
  postPayMessage,
} from './messaging';
import {
  DEFAULT_PAY_ORIGIN,
  type PayCallbacks,
  type PayCompletion,
  type PayFullConfig,
  type PayInput,
  type PayPosition,
} from './payConfig';

// Arta Pay checkout modal.
//
// Lifecycle: the constructor mounts the overlay + iframe immediately but
// hidden, so the widget can handshake and validate the purchase request
// context (`arta-pay:ready` -> `onReady`) before the seller enables its
// button. `open()` reveals the overlay and tells the widget it is visible;
// `close()` hides it without tearing anything down, so the widget keeps its
// session and resumes where it was on the next `open()`. `destroy()` removes
// the frame for good.
//
// Every message from the frame is accepted only when both the origin and the
// source window match the iframe the SDK created; every message to the frame
// is posted with the pinned pay origin.

const HANDSHAKE_TIMEOUT_MS = 10_000;
const OVERLAY_ID = 'arta-pay-overlay';
const FRAME_MIN_HEIGHT_PX = 240;
const RESIZE_DEAD_BAND_PX = 2;

// Hidden means invisible and inert, not `display:none`: the iframe has to
// keep loading and laying out so the widget can validate the context and
// measure itself before the seller opens the modal.
const overlayBaseCss =
  'box-sizing:border-box;position:fixed;inset:0;display:flex;background:rgba(17,15,16,0.55);' +
  'z-index:2147483000;visibility:hidden;pointer-events:none;';

const overlayPositionCss: Record<PayPosition, string> = {
  center: 'align-items:center;justify-content:center;',
  full_screen: 'align-items:stretch;justify-content:stretch;',
  left: 'align-items:stretch;justify-content:flex-start;',
  right: 'align-items:stretch;justify-content:flex-end;',
};

// The widget reports its content height via arta-pay:resize; the centered
// card follows it (capped to the viewport) while the side panels and full
// screen take the full viewport height.
// The centered height opens on the sign-in screen's own height, which the
// widget holds from its first paint (.arta-pay-shell min-height); starting
// anywhere else makes the frame resize once the widget reports itself.
// content-box is pinned because seller pages commonly reset `* { box-sizing:
// border-box }`, which would let the frame's border eat into the viewport the
// widget measures itself against.
const frameBaseCss =
  'box-sizing:content-box;border:0;background:#fff;transition:height 0.15s ease;';

const framePositionCss: Record<PayPosition, string> = {
  center:
    'width:min(576px, calc(100vw - 32px));height:min(539px, calc(100vh - 32px));' +
    'border:1px solid #d2d2d2;border-radius:8px;' +
    'box-shadow:0 24px 64px rgba(17,15,16,0.35);',
  full_screen: 'width:100vw;height:100vh;',
  left:
    'width:min(460px, 100vw);height:100vh;border-right:1px solid #d2d2d2;' +
    'box-shadow:24px 0 64px rgba(17,15,16,0.35);',
  right:
    'width:min(460px, 100vw);height:100vh;border-left:1px solid #d2d2d2;' +
    'box-shadow:-24px 0 64px rgba(17,15,16,0.35);',
};

export default class Pay {
  public isReady = false;
  public isOpen = false;

  private overlay: HTMLDivElement | undefined;
  private iframe: HTMLIFrameElement | undefined;
  private handshakeTimer: number | undefined;
  private destroyed = false;
  private completed = false;
  private openWhenMounted = false;
  private lastFrameHeight: number | undefined;
  private readonly payOrigin: string;
  private readonly messageListener = (event: MessageEvent) =>
    this.handleMessage(event);
  private readonly keydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.requestClose();
    }
  };
  private readonly domReadyListener = () => this.mount();

  constructor(
    private readonly input: PayInput,
    private readonly callbacks: PayCallbacks,
    private readonly config: PayFullConfig
  ) {
    this.payOrigin = config.payOrigin ?? DEFAULT_PAY_ORIGIN;

    if (document.body) {
      this.mount();
    } else {
      // Constructed from a <head> script: wait for the body to exist.
      document.addEventListener('DOMContentLoaded', this.domReadyListener);
    }
  }

  public open(): void {
    if (this.destroyed) {
      throw new Error('This Arta Pay instance has been destroyed');
    }
    if (this.isOpen) {
      return;
    }
    if (!this.overlay) {
      this.openWhenMounted = true;
      return;
    }
    this.reveal();
  }

  // Hides the overlay without tearing down the iframe, so the widget's
  // session state survives close/reopen.
  public close(): void {
    this.openWhenMounted = false;
    if (this.overlay) {
      this.overlay.style.visibility = 'hidden';
      this.overlay.style.pointerEvents = 'none';
    }
    document.removeEventListener('keydown', this.keydownListener);
    this.isOpen = false;
  }

  public destroy(): void {
    this.close();
    document.removeEventListener('DOMContentLoaded', this.domReadyListener);
    window.removeEventListener('message', this.messageListener);
    this.clearHandshakeTimer();
    this.overlay?.remove();
    this.overlay = undefined;
    this.iframe = undefined;
    this.isReady = false;
    this.destroyed = true;
  }

  private mount(): void {
    document.removeEventListener('DOMContentLoaded', this.domReadyListener);
    if (this.destroyed || this.overlay) {
      return;
    }

    window.addEventListener('message', this.messageListener);

    const position = this.config.position;

    this.overlay = document.createElement('div');
    this.overlay.id = OVERLAY_ID;
    this.overlay.style.cssText = overlayBaseCss + overlayPositionCss[position];
    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay) {
        this.requestClose();
      }
    });

    this.iframe = document.createElement('iframe');
    this.iframe.style.cssText = frameBaseCss + framePositionCss[position];
    this.iframe.setAttribute('title', 'Arta Pay');
    // The public key is an identifier, not a credential — it rides the
    // document request so the server can validate it (and, later, derive
    // per-key restrictions such as allowed embedding domains) before
    // serving the widget. The client token never goes in a URL.
    this.iframe.src =
      this.payOrigin +
      '/artapay-widget/embed?prid=' +
      encodeURIComponent(this.input.purchaseRequestId) +
      '&pk=' +
      encodeURIComponent(this.config.apiKey);

    this.overlay.appendChild(this.iframe);
    document.body.appendChild(this.overlay);

    this.startHandshakeTimer();

    if (this.openWhenMounted) {
      this.openWhenMounted = false;
      this.reveal();
    }
  }

  private reveal(): void {
    if (!this.overlay) {
      return;
    }
    this.overlay.style.visibility = 'visible';
    this.overlay.style.pointerEvents = 'auto';
    document.addEventListener('keydown', this.keydownListener);
    this.isOpen = true;
    this.postToFrame({ type: 'arta-pay:open' });
  }

  // The widget owns the close decision; the SDK only requests it. Before the
  // handshake completes there is nobody to ask, so close directly.
  private requestClose(): void {
    if (this.isReady) {
      this.postToFrame({ type: 'arta-pay:close-request' });
    } else {
      this.close();
      this.callbacks.onClose?.({
        purchaseRequestId: this.input.purchaseRequestId,
        reason: 'customer',
      });
    }
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
    switch (data.type) {
      case 'arta-pay:handshake':
        this.handleHandshake();
        break;
      case 'arta-pay:ready':
        this.handleReady();
        break;
      case 'arta-pay:resize':
        this.handleResize(data);
        break;
      case 'arta-pay:complete':
        this.handleComplete(data);
        break;
      case 'arta-pay:close':
        this.close();
        this.callbacks.onClose?.({
          purchaseRequestId: this.input.purchaseRequestId,
          reason: parseCloseReason(data),
        });
        break;
      case 'arta-pay:error':
        this.handleError(data);
        break;
    }
  }

  private handleHandshake(): void {
    // A handshake after ready means the frame reloaded: it has to validate
    // the context again before the modal can be considered ready.
    this.isReady = false;
    this.startHandshakeTimer();

    this.postToFrame({
      type: 'arta-pay:init',
      purchaseRequestId: this.input.purchaseRequestId,
      clientToken: this.input.clientToken,
      position: this.config.position,
    });
  }

  private handleReady(): void {
    this.clearHandshakeTimer();
    if (this.isReady) {
      return;
    }
    this.isReady = true;
    this.callbacks.onReady?.();
  }

  private handleResize(data: unknown): void {
    // The side panels and full screen keep the full viewport height.
    if (this.config.position !== 'center' || !this.iframe) {
      return;
    }
    const height = parseResizeHeight(data);
    if (height === undefined) {
      return;
    }
    const px = Math.max(FRAME_MIN_HEIGHT_PX, Math.round(height));
    // Sub-pixel layouts (zoom, display scaling) make a re-measured frame come
    // back a pixel short; a dead band keeps that from ratcheting the height.
    if (
      this.lastFrameHeight !== undefined &&
      Math.abs(px - this.lastFrameHeight) < RESIZE_DEAD_BAND_PX
    ) {
      return;
    }
    this.lastFrameHeight = px;
    this.iframe.style.height = `min(${px}px, calc(100vh - 32px))`;
  }

  // `onComplete` fires at most once per instance. The widget may re-render
  // its outcome screen (and re-send `complete`) when the buyer reopens a
  // finished checkout; the seller only hears about it the first time.
  private handleComplete(data: unknown): void {
    if (this.completed) {
      return;
    }

    const completion = parseCompletion(data);
    if (
      !completion ||
      (completion.purchaseRequestId !== undefined &&
        completion.purchaseRequestId !== this.input.purchaseRequestId)
    ) {
      // Not a v2 outcome (or an outcome for another purchase request). The
      // buyer may well have finished, so the modal stays open; the seller
      // must confirm server-side either way.
      this.callbacks.onError?.({
        code: 'protocol_error',
        message:
          'The Arta Pay widget reported an outcome this SDK does not understand; ' +
          'confirm the purchase request status server-side',
        recoverable: true,
      });
      return;
    }

    this.completed = true;
    const result: PayCompletion = {
      purchaseRequestId: this.input.purchaseRequestId,
      status: completion.status,
    };
    if (completion.purchaseId !== undefined) {
      result.purchaseId = completion.purchaseId;
    }
    this.callbacks.onComplete?.(result);
  }

  private handleError(data: unknown): void {
    const error = parseError(data);
    this.callbacks.onError?.(error);
    if (!error.recoverable) {
      this.abort();
    }
  }

  private handleHandshakeTimeout(): void {
    this.handshakeTimer = undefined;
    this.callbacks.onError?.({
      code: 'frame_load_failed',
      message: 'The Arta Pay widget did not respond in time',
      recoverable: true,
    });
    this.abort();
  }

  // The widget cannot (currently) complete this purchase request. The modal
  // goes away if it was showing, but the iframe stays mounted so a later
  // `open()` shows the widget's own error screen instead of a blank frame.
  private abort(): void {
    this.clearHandshakeTimer();
    this.isReady = false;
    if (this.isOpen) {
      this.close();
      this.callbacks.onClose?.({
        purchaseRequestId: this.input.purchaseRequestId,
        reason: 'error',
      });
    }
  }

  private postToFrame(message: PayOutboundMessage): void {
    if (this.iframe?.contentWindow) {
      postPayMessage(this.iframe.contentWindow, this.payOrigin, message);
    }
  }

  private startHandshakeTimer(): void {
    this.clearHandshakeTimer();
    this.handshakeTimer = window.setTimeout(
      () => this.handleHandshakeTimeout(),
      HANDSHAKE_TIMEOUT_MS
    );
  }

  private clearHandshakeTimer(): void {
    if (this.handshakeTimer !== undefined) {
      window.clearTimeout(this.handshakeTimer);
      this.handshakeTimer = undefined;
    }
  }
}
