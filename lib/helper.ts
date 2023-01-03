import { DestinationFullTextConfig } from './components/Destination';
import { DisqualifiedFullTextConfig } from './components/Disqualified';
import { QuoteFullTextConfig } from './components/Quotes';
import { EstimateFullConfig } from './estimateConfig';
import { ArtaLocation } from './MetadataTypes';

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

export const getQuoteConfig = (config: EstimateFullConfig): QuoteFullTextConfig => {
  return {
    ...config.text.quoted,
    detailOriginLabel: config.text.detailOriginLabel,
    detailDestinationLabel: config.text.detailDestinationLabel,
    returnLinkLabel: config.text.returnLinkLabel
  };
};

export const getDisqualifiedConfig = (config: EstimateFullConfig): DisqualifiedFullTextConfig => { 
  return {
    ...config.text.disqualified,
    detailOriginLabel: config.text.detailOriginLabel,
    detailDestinationLabel: config.text.detailDestinationLabel,
    returnLinkLabel: config.text.returnLinkLabel
  };
};

export const getDestinationConfig = (config: EstimateFullConfig): DestinationFullTextConfig => {
  return {
    ...config.text.destination,
    detailOriginLabel: config.text.detailOriginLabel,
    backgroundColor: config.style.color.backgroundColor,
  };
};

export const getStyle = (config: EstimateFullConfig) => {
  return {
    '--primary-color': config.style.color.primaryColor,
    '--primary-unfocused-color': config.style.color.primaryUnfocusedColor,
    '--secondary-color': config.style.color.secondaryColor,
    '--error-color': config.style.color.errorColor,
    '--background-color': config.style.color.backgroundColor,
  };
};
