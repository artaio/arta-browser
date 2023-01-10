import { EstimateBody, EstimateConfig, getFullConfig } from './estimateConfig';
import Estimate from './estimate';

export interface ArtaJsConfig {
  host: string;
}

export interface ArtaJsFullConfig extends ArtaJsConfig {
  apiKey: string;
}

const defaultConfig: ArtaJsConfig = {
  host: 'api.arta.io',
};

export default class Arta {
  private el: HTMLDivElement | undefined;
  private config: ArtaJsFullConfig | undefined;

  public init(apiKey: string, config?: Partial<ArtaJsConfig>): void {
    this.config = Object.assign({ ...defaultConfig, apiKey }, config);

    if (document.querySelectorAll('#arta-widget').length) {
      return;
    }
    this.el = document.createElement('div');
    this.el.id = 'arta-widget';
    document.body.appendChild(this.el);
  }

  public estimate(
    estimateBody: EstimateBody,
    esimateConfig?: Partial<EstimateConfig>
  ) {
    if (this.config && this.el) {
      const fullEstimateConfig = getFullConfig(this.config, esimateConfig);

      return new Estimate(estimateBody, fullEstimateConfig, this.el);
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before creating estimates'
      );
    }
  }
}
