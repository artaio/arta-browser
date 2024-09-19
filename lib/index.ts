import Arta from './arta';
import './components/Modal/index.css';
import './components/TrackingDrawer/index.css';

const init = () => {
  (<any>window).Arta = new Arta();
};

init();

export * from './arta';
export * from './estimate';
export * from './tracking';
export type {
  EstimateConfig,
  EstimateBody,
  PartialEstimateConfig,
} from './estimateConfig';
export type { TrackingConfig, PartialTrackingConfig } from './trackingConfig';

export default (<any>window).Arta as Arta;
