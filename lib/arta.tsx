import Estimate, { EstimateBody } from './estimate';

export interface ArtaJsConfig {
  host?: string;
  position?: 'center' | 'left' | 'right';
  apiKey: string;
}

export interface IArta {
  ready: boolean;
  init: (apiKey: string, config?: ArtaJsConfig) => void;
}

export type ValidateResult = any;

const defaultConfig: Partial<ArtaJsConfig> = {
  position: 'right',
  host: 'api.arta.io',
};

export default class Arta implements IArta {
  private el: HTMLDivElement | undefined;
  private config: ArtaJsConfig | undefined;

  constructor(public ready = false) {}

  public init(apiKey: string, config?: ArtaJsConfig): void {
    this.config = Object.assign({ ...defaultConfig, apiKey }, config);

    if (document.querySelectorAll('#arta-widget').length) {
      return;
    }
    this.el = document.createElement('div');
    this.el.id = 'arta-widget';
    document.body.appendChild(this.el);
  }

  public estimate(estimateBody: EstimateBody) {
    if (this.config && this.el) {
      return new Estimate(estimateBody, this.config, this.el);
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before creating estimates'
      );
    }
  }
}
