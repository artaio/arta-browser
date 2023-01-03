import { render } from 'preact';
import { Modal } from './components/Modal';
import { EstimateBody, EstimateFullConfig } from './estimateConfig';
import { validateEstimateBody } from './requests';

export default class Estimate {
  public ready = false;
  constructor(
    private readonly estimateBody: EstimateBody,
    private readonly config: EstimateFullConfig,
    private readonly el: HTMLDivElement
  ) {}

  public open() {
    render(
      <Modal
        onClose={this.onClose.bind(this)}
        estimateBody={this.estimateBody}
        config={this.config}
      />,
      this.el
    );
  }

  public onClose(e: any) {
    e.preventDefault();
    render(<div></div>, this.el);
  }

  public async validate() {
    await validateEstimateBody(this.config, this.estimateBody);
    this.ready = true;
  }
}
