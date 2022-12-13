import { render } from 'preact';
import { ArtaJsConfig } from './arta';
import { Modal } from './components/Modal';
import { ArtaLocation, ArtaObject } from './types';

export default class Estimate {
  public ready = false;
  constructor(
    private readonly artaOrigin: ArtaLocation,
    private readonly artaObjects: ArtaObject[],
    private readonly config: ArtaJsConfig,
    private readonly el: HTMLDivElement
  ) {}

  public open() {
    render(
      <Modal
        origin={this.artaOrigin}
        objects={this.artaObjects}
        config={this.config}
      />,
      this.el
    );
  }

  public async validate() {
    await fetch('https://api.arta.io/estimate/validate', {
      method: 'POST',
      body: JSON.stringify({
        estimate: {
          objects: this.artaObjects,
          origin: this.artaOrigin,
        },
      }),
      headers: {
        Authorization: `ARTA_APIKey ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    this.ready = true;
  }
}
