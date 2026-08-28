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
import Pay from './pay';
import InfoModal from './infoModal';
import {
  getFullPayConfig,
  type PartialPayConfig,
  type PayCallbacks,
  type PayInput,
} from './payConfig';
import { getFullInfoConfig, type InfoInput } from './infoConfig';
import {
  monthlyEstimate,
  type MonthlyEstimate,
  type MonthlyEstimateInput,
} from './monthlyEstimate';

export interface ArtaJsConfig {
  host: string;
  httpSchema?: 'http' | 'https';
  payOrigin?: string;
}

export interface ArtaJsFullConfig extends ArtaJsConfig {
  apiKey: string;
}

const defaultConfig: ArtaJsConfig = {
  host: 'api.arta.io',
  httpSchema: 'https',
  payOrigin: 'https://pay.arta.io',
};

export default class Arta {
  private el: HTMLDivElement | undefined;
  private config: ArtaJsFullConfig | undefined;

  public init(apiKey: string, config?: Partial<ArtaJsConfig>): void {
    if (!apiKey || !apiKey.trim()) {
      throw new Error('Please provide your Arta public API key to Arta.init');
    }
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
    estimateConfig: PartialEstimateConfig = {}
  ) {
    if (this.config && this.el) {
      const fullEstimateConfig = getFullEstimateConfig(
        this.config,
        estimateConfig
      );
      return new Estimate(estimateBody, fullEstimateConfig, this.el);
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before creating estimates'
      );
    }
  }

  // Creates an Arta Pay checkout for a purchase request the seller's server
  // created with its private key. The widget iframe mounts immediately
  // (hidden) and validates the purchase request; `onReady` is the signal to
  // enable the "Pay with Arta" button, and `open()` shows the modal.
  public pay(
    payInput: PayInput,
    payCallbacks: PayCallbacks = {},
    payConfig: PartialPayConfig = {}
  ) {
    if (this.config) {
      return new Pay(
        payInput,
        payCallbacks,
        getFullPayConfig(this.config, payConfig)
      );
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before creating Arta Pay checkouts'
      );
    }
  }

  // A "from $X/mo" Arta Pay estimate for a price, for placements and CTAs (e.g.
  // "From $1,246/mo with Arta Pay"). The checkout shows the buyer's exact,
  // quoted schedule. Resolves from local math today; it returns a promise so
  // that computing it server-side later does not change this signature.
  public getArtaPayMonthlyEstimate(
    input: MonthlyEstimateInput
  ): Promise<MonthlyEstimate> {
    return monthlyEstimate(input);
  }

  // Opens the login-free Arta Pay info modal: a marketing modal explaining
  // Arta Pay, optionally showing a financing estimate when `totalPrice` is
  // given. It only needs the public key from `Arta.init` — no purchase request.
  public openArtaPayInfoModal(input: InfoInput = {}) {
    if (this.config) {
      const modal = new InfoModal(input, getFullInfoConfig(this.config));
      modal.open();
      return modal;
    } else {
      throw new Error(
        'Please initialize the SDK with Arta.init before opening the Arta Pay info modal'
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
