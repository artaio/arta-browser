import { render } from 'preact';
import { ArtaJsFullConfig } from './arta';
import { Modal } from './components/Modal';
import {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  Insurance,
  QuoteType,
  SupportedCurrency,
} from './MetadataTypes';
import { validateEstimateBody } from './requests';

export interface EstimateBody {
  origin: ArtaLocation;
  objects: ArtaObject[];
  additional_services?: AdditionalService[];
  currency?: SupportedCurrency;
  destination?: ArtaLocation;
  insurance?: Insurance;
  internal_reference?: string;
  public_reference?: string;
  preferred_quote_types?: QuoteType[];
}

export interface EstimateConfig {
  position: 'center' | 'left' | 'right';
  pricingDisplay: 'starts_at' | 'range';
  title: string;
  destinationLabel: string;
}

export interface EstimateFullConfig extends EstimateConfig, ArtaJsFullConfig {}

export const defaultEstimateConfig: EstimateConfig = {
  position: 'right',
  pricingDisplay: 'starts_at',
  title: 'Estimate Shipping Costs',
  destinationLabel: 'Get a cost estimate to ship these goods from:',
};

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
