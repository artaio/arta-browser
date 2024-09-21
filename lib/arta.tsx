import {
  type EstimateBody,
  type PartialEstimateConfig,
  getFullEstimateConfig,
} from './estimateConfig';
import {
  type PartialTrackingConfig,
  getFullTrackingConfig,
} from './trackingConfig';

import Estimate from './estimate';
import Tracking from './tracking';

export interface ArtaJsConfig {
  host: string;
  httpSchema?: 'http' | 'https';
}

export interface ArtaJsFullConfig extends ArtaJsConfig {
  apiKey: string;
}

const defaultConfig: ArtaJsConfig = {
  host: 'api.arta.io',
  httpSchema: 'https',
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
    esimateConfig: PartialEstimateConfig = {}
  ) {
    if (this.config && this.el) {
      const fullEstimateConfig = getFullEstimateConfig(
        this.config,
        esimateConfig
      );
      return new Estimate(estimateBody, fullEstimateConfig, this.el);
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before creating estimates'
      );
    }
  }

  public tracking(
    shipmentId: string,
    trackingConfig: PartialTrackingConfig = {}
  ) {
    if (this.config && this.el) {
      const fullTrackingConfig = getFullTrackingConfig(
        this.config,
        trackingConfig
      );
      return new Tracking(shipmentId, fullTrackingConfig, this.el);
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before creating tracking'
      );
    }
  }
}
