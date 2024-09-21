import { ArtaJsFullConfig } from './arta';
import {
  defaultDestinationConfig,
  type DestinationTextConfig,
} from './components/Destination';
import {
  defaultDisqualifiedConfig,
  type DisqualifiedTextConfig,
} from './components/Disqualified';
import { defaultQuoteConfig, type QuoteTextConfig } from './components/Quotes';
import {
  applySmallMobileStyling,
  deepClone,
  nestedObjectAssign,
  type DeepPartial,
} from './helper';
import {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  Insurance,
  QuoteType,
  SupportedCurrency,
} from './MetadataTypes';

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
  style: {
    color: {
      background: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
      borderHover: string;
      borderFocused: string;
      buttonBackground: string;
      buttonBackgroundHover: string;
      buttonBackgroundDisabled: string;
      buttonText: string;
      buttonTextHover: string;
      buttonTextDisabled: string;
      quoteBackground: string;
      errorText: string;
      errorBackground: string;
    };
    position: 'center' | 'left' | 'right';
    pricingDisplay: 'starts_at' | 'range';
    fontFamily: string;
    fontSize: number;
    width: number;
    height: number;
  };
  text: {
    detailOriginLabel: string;
    detailDestinationLabel: string;
    returnLinkLabel: string;
    header: {
      title: string;
    };
    destination: DestinationTextConfig;
    quoted: QuoteTextConfig;
    disqualified: DisqualifiedTextConfig;
  };
}

export type PartialEstimateConfig = DeepPartial<EstimateConfig>;

export interface EstimateFullConfig extends EstimateConfig, ArtaJsFullConfig {}

export const defaultEstimateConfig: EstimateConfig = {
  style: {
    color: {
      background: '#FFFFFF',
      textPrimary: '#110F10',
      textSecondary: '#6F6C65',
      border: '#D7D6D0',
      borderHover: '#6F6C65',
      borderFocused: '#110F10',
      buttonBackground: '#110F10',
      buttonBackgroundHover: '#6F6C65',
      buttonBackgroundDisabled: '#F2F2F2',
      buttonText: '#FFFFFF',
      buttonTextHover: '#FFFFFF',
      buttonTextDisabled: '#9D9D9D',
      quoteBackground: '#F2F2F2',
      errorText: '#822828',
      errorBackground: '#FBECEC',
    },
    position: 'right',
    pricingDisplay: 'starts_at',
    fontFamily: 'Neue Haas Grotesk Text Pro, Arial, Helvetica, sans-serif',
    fontSize: 14,
    width: 320,
    height: 467,
  },
  text: {
    detailOriginLabel: '(origin)',
    detailDestinationLabel: '(destination)',
    returnLinkLabel: 'Change Destination',
    header: {
      title: 'Estimate Shipping Costs',
    },
    destination: defaultDestinationConfig,
    quoted: defaultQuoteConfig,
    disqualified: defaultDisqualifiedConfig,
  },
};

export const getFullEstimateConfig = (
  artaConfig: ArtaJsFullConfig,
  estimateConfig?: PartialEstimateConfig
): EstimateFullConfig => {
  const finalConfig = nestedObjectAssign(
    deepClone(defaultEstimateConfig),
    artaConfig,
    estimateConfig
  );

  applySmallMobileStyling(finalConfig);

  return finalConfig;
};
