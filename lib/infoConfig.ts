import { type ArtaJsFullConfig } from './arta';
import { type PayPosition, DEFAULT_PAY_ORIGIN } from './payConfig';

// Input to `Arta.openArtaPayInfoModal`. The optional total price drives a
// financing estimate in the modal; omit it for the plain marketing modal.
export interface InfoInput {
  totalPrice?: number;
}

// Where the Arta-hosted info modal sits on the seller's page. Same vocabulary
// as the checkout and estimate widgets.
export interface InfoConfig {
  position: PayPosition;
}

export type PartialInfoConfig = Partial<InfoConfig>;

export interface InfoFullConfig extends InfoConfig, ArtaJsFullConfig {}

const defaultInfoConfig: InfoConfig = {
  position: 'center',
};

export const getFullInfoConfig = (
  artaConfig: ArtaJsFullConfig,
  infoConfig: PartialInfoConfig = {}
): InfoFullConfig => {
  return Object.assign({}, defaultInfoConfig, artaConfig, infoConfig);
};

export { DEFAULT_PAY_ORIGIN };
