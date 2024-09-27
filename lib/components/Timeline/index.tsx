import type { TrackingConfig } from '../../trackingConfig';
import type { Shipment } from '../TrackingDrawer';
import { TimelineDefault } from './TimelineDefault';
import { TimelineMinimal } from './TimlineMinimal';

export interface TimelineProps {
  shipment: Shipment;
  config: TrackingConfig;
}

export const Timeline = ({ config, shipment }: TimelineProps) => {
  return config.style.variant === 'minimal' ? (
    <TimelineMinimal shipment={shipment} config={config} />
  ) : (
    <TimelineDefault shipment={shipment} config={config} />
  );
};
