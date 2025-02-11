import Arta from './arta';
import './components/Modal/index.css';
import './components/TrackingDrawer/index.css';
import Estimate from './estimate';
import Tracking from './tracking';

const init = () => {
  (<any>window).Arta = new Arta();
};

init();

export * from './arta';
export * from './estimate';
export * from './tracking';
export {
  Estimate,
  Tracking
};
export * from './MetadataTypes';
export type {
  EstimateConfig,
  EstimateBody,
  PartialEstimateConfig,
} from './estimateConfig';
export type { TrackingConfig, PartialTrackingConfig } from './trackingConfig';

export default (<any>window).Arta as Arta;
