import { ArtaJsFullConfig } from './arta';
import { defaultDestinationConfig, DestinationTextConfig } from './components/Destination';
import { defaultDisqualifiedConfig, DisqualifiedTextConfig } from './components/Disqualified';
import { defaultQuoteConfig, QuoteTextConfig } from './components/Quotes';
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
        primaryColor: string;
        primaryUnfocusedColor: string;
        secondaryColor: string;
        errorColor: string;
        backgroundColor: string;
        poweredByButtonColor: string;
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
      loading: {
        message: string;
      };
      destination: DestinationTextConfig;
      quoted: QuoteTextConfig;
      disqualified: DisqualifiedTextConfig;
    };
  }
  
  export interface EstimateFullConfig extends EstimateConfig, ArtaJsFullConfig {}
  
  export const defaultEstimateConfig: EstimateConfig = {
    style: {
      color: {
        primaryColor: '#001F3F',
        primaryUnfocusedColor: '#4d6279',
        secondaryColor: '#99A5B2',
        errorColor: '#D84242',
        backgroundColor: 'white',
        poweredByButtonColor: '#F5F6F7',
      },
      position: 'right',
      pricingDisplay: 'starts_at',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 12,
      width: 300,
      height: 432,
    },
    text: {
      detailOriginLabel: '(origin)',
      detailDestinationLabel: '(destination)',
      returnLinkLabel: 'Change Destination',
      loading: {
        message:  'Retrieving shipping costs...',
      },
      header: {
        title: 'Estimate Shipping Costs',
      },
      destination: defaultDestinationConfig,
      quoted: defaultQuoteConfig,
      disqualified: defaultDisqualifiedConfig,
    }
};

function nestedObjectAssign (target:any, ...sources: any[]) {
  sources.forEach(source => {
    if(source) {
      Object.keys(source).forEach(key => {
        const s_val = source[key];
        const t_val = target[key];
        target[key] = t_val && s_val && typeof t_val === 'object' && typeof s_val === 'object'
                    ? nestedObjectAssign(t_val, s_val)
                    : s_val;
      });
    }
  });
  return target;
}

export const getFullConfig = (artaConfig: ArtaJsFullConfig, estimateConfig?: Partial<EstimateConfig>): EstimateFullConfig => {
    const finalConfig = nestedObjectAssign({
      ...defaultEstimateConfig,
      ...artaConfig
    }, estimateConfig);

    console.log('final config', finalConfig);

    return finalConfig;
};