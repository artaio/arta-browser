import { render } from 'preact';
import { ArtaJsConfig } from './arta';
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

export default class Estimate {
  public ready = false;
  constructor(
    private readonly estimateBody: EstimateBody,
    private readonly config: ArtaJsConfig,
    private readonly el: HTMLDivElement
  ) {}

  public open() {
    render(
      <Modal estimateBody={this.estimateBody} config={this.config} />,
      this.el
    );
  }

  public async validate() {
    await validateEstimateBody(this.config, this.estimateBody);
    this.ready = true;
  }
}
