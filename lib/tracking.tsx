import { render } from 'preact';
import type { TrackingFullConfig } from './trackingConfig';
import { TrackingDrawer } from './components/TrackingDrawer';

export default class Tracking {
  public isReady = false;
  public isOpen = false;
  constructor(
    private readonly shipmentId: string,
    private readonly config: TrackingFullConfig,
    private readonly el: HTMLDivElement
  ) {}

  public open() {
    this.render();
    this.isOpen = true;
  }

  private render() {
    render(
      <TrackingDrawer
        shipmentId={this.shipmentId}
        config={this.config}
        onClose={this.onClose.bind(this)}
      />,
      this.el
    );
  }

  public close() {
    render(<div></div>, this.el);
    this.isOpen = false;
  }

  public onClose(e: any) {
    e.preventDefault();
    this.close();
    this.isOpen = false;
  }

  public async validate() {
    // TODO: Implement validation
    this.isReady = true;
  }
}