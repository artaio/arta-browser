import { DestinationFullTextConfig } from './components/Destination';
import { DisqualifiedFullTextConfig } from './components/Disqualified';
import { QuoteFullTextConfig } from './components/Quotes';
import { EstimateFullConfig } from './estimateConfig';
import { ArtaLocation } from './MetadataTypes';
import { AnimationConfig, TrackingFullConfig } from './trackingConfig';

export const parseEstimatedLocation = (loc: ArtaLocation): string => {
  if (!loc) {
    return '';
  }

  if (!loc.estimated_country || !loc.estimated_city) {
    return `${loc.postal_code}, ${loc.country}`;
  }

  const region =
    loc.estimated_country === 'US' && loc.estimated_region
      ? loc.estimated_region
      : '';

  const city = loc.estimated_city.toLowerCase();
  return region === ''
    ? `${city}, ${loc.estimated_country}`
    : `${city}, ${region}, ${loc.estimated_country}`;
};

export const parseErrors = (errors: { [key: string]: string }): string[] => {
  const errorMessages = [];
  const keys = Object.keys(errors);
  if (keys.includes('destination')) {
    errorMessages.push(
      'Invalid location details. Please check your destination address info and try again.'
    );
  } else if (keys.includes('origin')) {
    errorMessages.push(
      'Invalid location details. Please check your origin address info and try again.'
    );
  } else {
    errorMessages.push(
      'We have encountered an error.\nPlease try submitting the form again.'
    );
  }

  return errorMessages;
};

export const getQuoteConfig = (
  config: EstimateFullConfig
): QuoteFullTextConfig => {
  return {
    ...config.text.quoted,
    detailOriginLabel: config.text.detailOriginLabel,
    detailDestinationLabel: config.text.detailDestinationLabel,
    returnLinkLabel: config.text.returnLinkLabel,
  };
};

export const getDisqualifiedConfig = (
  config: EstimateFullConfig
): DisqualifiedFullTextConfig => {
  return {
    ...config.text.disqualified,
    detailOriginLabel: config.text.detailOriginLabel,
    detailDestinationLabel: config.text.detailDestinationLabel,
    returnLinkLabel: config.text.returnLinkLabel,
  };
};

export const getDestinationConfig = (
  config: EstimateFullConfig
): DestinationFullTextConfig => {
  return {
    ...config.text.destination,
    detailOriginLabel: config.text.detailOriginLabel,
    background: config.style.color.background,
  };
};

export const getEstimateStyle = (config: EstimateFullConfig) => {
  return {
    '--background': config.style.color.background,
    '--text-primary': config.style.color.textPrimary,
    '--text-secondary': config.style.color.textSecondary,
    '--border': config.style.color.border,
    '--border-hover': config.style.color.borderHover,
    '--border-focused': config.style.color.borderFocused,
    '--button-background': config.style.color.buttonBackground,
    '--button-background-hover': config.style.color.buttonBackgroundHover,
    '--button-background-disabled': config.style.color.buttonBackgroundDisabled,
    '--button-text': config.style.color.buttonText,
    '--button-text-hover': config.style.color.buttonTextHover,
    '--button-text-disabled': config.style.color.buttonTextDisabled,
    '--quote-background': config.style.color.quoteBackground,
    '--error-text': config.style.color.errorText,
    '--error-background': config.style.color.errorBackground,
    '--font-family': config.style.fontFamily,
    '--font-size': `${config.style.fontSize}px`,
    '--width': `${config.style.width}px`,
    '--height': `${config.style.height}px`,
  };
};

export const getTrackingStyle = (config: TrackingFullConfig) => {
  return {
    '--background': config.style.color.background,
    '--text-primary': config.style.color.textPrimary,
    '--text-secondary': config.style.color.textSecondary,
    '--border': config.style.color.border,
    '--font-family': config.style.fontFamily,
    '--font-size': `${config.style.fontSize}px`,
    '--width': config.style.variant === 'default' ? '540px' : '320px',
    '--default-styling': config.style.variant === 'default' ? 'flex' : 'none',
    '--minimal-styling': config.style.variant === 'default' ? 'none' : 'flex',

    '--location-direction':
      config.style.variant === 'default' ? 'row' : 'column',
    '--location-justify':
      config.style.variant === 'default' ? 'center' : 'flex-start',
    '--location-align':
      config.style.variant === 'default' ? 'flex-start' : 'center',
    '--location-flex':
      config.style.variant === 'default' ? '1 0 0' : '0 1 auto',
    '--backdrop-color': config.style.backdropColor,
    '--animationIn': getAnimationStyleIn(config.animation.in, config),
  };
};

const getAnimationStyleIn = (
  animation: AnimationConfig,
  config: TrackingFullConfig
) => {
  if (animation.type === null) {
    return 'none';
  }

  const type =
    animation.type === 'fade'
      ? 'fadeInAnimation'
      : config.style.position === 'left'
      ? 'slideInFromLeft'
      : 'slideInFromRight';

  return `${type} ease ${animation.duration}ms`;
};

const MINIMUM_RENDERING_HEIGHT = 467;

export function isSmallMobile(): boolean {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}

export function applySmallMobileStyling(finalConfig: EstimateFullConfig): void {
  if (isSmallMobile()) {
    finalConfig.style.position = 'center';
    finalConfig.style.width = window.screen.availWidth;
    finalConfig.style.height = Math.max(
      window.screen.availHeight,
      MINIMUM_RENDERING_HEIGHT
    );
  }
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export function nestedObjectAssign(target: any, ...sources: any[]) {
  sources.forEach((source) => {
    if (source) {
      Object.keys(source).forEach((key) => {
        const s_val = source[key];
        const t_val = target[key];
        target[key] =
          t_val &&
          s_val &&
          typeof t_val === 'object' &&
          typeof s_val === 'object'
            ? nestedObjectAssign(t_val, s_val)
            : s_val;
      });
    }
  });
  return target;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
