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
