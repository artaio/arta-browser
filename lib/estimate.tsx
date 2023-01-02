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
  detailOriginLabel: string;
  detailDestinationLabel: string;
  returnLinkLabel: string;
  destinationDescriptionLabel: string;
  destinationButtonText: string;
  destinationCountryLabel: string;
  destinationZipLabel: string;
  destinationCityLabel: string;
  loadingTextMessage: string;
  quotedShipFromLabel: string;
  quotedShipToLabel: string;
  quotedDisclaimerLabel: string;
  quotedExcludeDisclaimerLabel: string;
  quotedRangeLabel: string;
  quotedStartsAtLabel: string;
  quotedArtaInsuranceLabel: string;
  disqualifiedShipFromLabel: string;
  disqualifiedShipToLabel: string;
  disqualifiedContactEmail: string;
  disqualifiedEmailHeaderLabel: string;
  disqualifiedEmailFooterLabel: string;
}

export interface EstimateFullConfig extends EstimateConfig, ArtaJsFullConfig {}

export const defaultEstimateConfig: EstimateConfig = {
  position: 'right',
  pricingDisplay: 'starts_at',
  title: 'Estimate Shipping Costs',
  detailOriginLabel: '(origin)',
  detailDestinationLabel: '(destination)',
  returnLinkLabel: 'Change Destination',
  destinationDescriptionLabel: 'Get a cost estimate to ship these goods from:',
  destinationButtonText: 'Get Costs',
  destinationCountryLabel: 'Country',
  destinationZipLabel: 'Destination Postal/Zip Code',
  destinationCityLabel: 'Destination City',
  loadingTextMessage: 'Retrieving shipping costs...',
  quotedShipFromLabel: 'These goods ship from:',
  quotedShipToLabel: 'To:',
  quotedDisclaimerLabel: 'Actual shipping costs will be provided at checkout.',
  quotedExcludeDisclaimerLabel: 'Excludes duties & taxes',
  quotedRangeLabel: 'Shipping estimated between',
  quotedStartsAtLabel: 'Shipping Starts at',
  quotedArtaInsuranceLabel: 'This estimate includes ARTA Full Risk Insurance',
  disqualifiedShipFromLabel: 'Unfortunately we could not retrieve costs for shipping these goods from:',
  disqualifiedShipToLabel: 'To:',
  disqualifiedContactEmail: 'hello@arta.io',
  disqualifiedEmailHeaderLabel: 'Please contact',
  disqualifiedEmailFooterLabel: 'to request a custom quote',
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
