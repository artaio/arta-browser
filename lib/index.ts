import Arta from './arta';
import './components/Modal/index.css';
import './components/TrackingDrawer/index.css';
import Estimate from './estimate';
import Tracking from './tracking';
import Pay from './pay';
import InfoModal from './infoModal';

const init = () => {
  (<any>window).Arta = new Arta();
};

init();

export * from './arta';
export * from './estimate';
export * from './tracking';
export { Estimate, Tracking, Pay, InfoModal };
export { monthlyEstimate } from './monthlyEstimate';
export type {
  InfoInput,
  InfoConfig,
  PartialInfoConfig,
  InfoFullConfig,
} from './infoConfig';
export type { MonthlyEstimate, MonthlyEstimateInput } from './monthlyEstimate';
export type {
  PayInput,
  PayCallbacks,
  PayCompletion,
  PayCompletionStatus,
  PayCloseEvent,
  PayCloseReason,
  PayError,
  PayPosition,
  PayConfig,
  PartialPayConfig,
  PayFullConfig,
} from './payConfig';
export type { PayInboundMessage, PayOutboundMessage } from './messaging';
export * from './MetadataTypes';
export type {
  EstimateConfig,
  EstimateBody,
  PartialEstimateConfig,
} from './estimateConfig';
export type { TrackingConfig, PartialTrackingConfig } from './trackingConfig';

export default (<any>window).Arta as Arta;
