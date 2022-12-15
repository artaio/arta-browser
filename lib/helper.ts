import { ArtaLocation } from './MetadataTypes';

export const parseEstimatedLocation = (loc: ArtaLocation): string => {
  if (!loc.estimated_country || !loc.estimated_city) {
    return `${loc.postal_code}, ${loc.country}`;
  }

  const region =
    loc.estimated_country === 'US' && loc.estimated_region
      ? loc.estimated_region
      : '';

  const city = loc.estimated_city.toLowerCase();
  return `${city}, ${region}, ${loc.estimated_country}`;
};
