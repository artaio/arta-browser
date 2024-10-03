import type { TrackingConfig } from '../../trackingConfig';
import type { Shipment } from '../TrackingDrawer';
import { TimelineDefault } from './TimelineDefault';
import { TimelineMinimal } from './TimlineMinimal';

export interface TimelineProps {
  shipment: Shipment;
  config: TrackingConfig;
}

export const Timeline = ({ config, shipment }: TimelineProps) => {
  return <div class="artajs__tracking__timeline__wrapper">
    <TimelineMinimal shipment={shipment} config={config} />
    <TimelineDefault shipment={shipment} config={config} />
  </div>;
};
