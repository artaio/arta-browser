import { render } from 'preact';
import { Modal } from './components/Modal';
import { EstimateBody, EstimateFullConfig } from './estimateConfig';
import { validateEstimateBody } from './requests';
import { applySmallMobileStyling, isSmallMobile } from './helper';

export default class Estimate {
  public isReady = false;
  public isOpen = false;
  private addedOrientationChangeListener = false;
  constructor(
    private readonly estimateBody: EstimateBody,
    private readonly config: EstimateFullConfig,
    private readonly el: HTMLDivElement
  ) {}

  public open() {
    if (!this.addedOrientationChangeListener) {
      window.screen.orientation.addEventListener('change', () => {
        applySmallMobileStyling(this.config);
        if (this.isOpen) {
          this.render();
        }
      });
      this.addedOrientationChangeListener = true;
    }

    this.render();
    this.isOpen = true;
  }

  private render() {
    render(
      <Modal
        onClose={this.onClose.bind(this)}
        estimateBody={this.estimateBody}
        config={this.config}
      />,
      this.el
    );

    if (isSmallMobile()) {
      window.scrollTo({ top: 0 });
    }
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
    const errors = await validateEstimateBody(this.config, this.estimateBody);
    if (errors && Object.keys(errors).length > 0) {
      return Promise.reject(errors);
    }
    this.isReady = true;
  }
}
