import type { TrackingConfig } from '../../trackingConfig';
import type { Shipment } from '../TrackingDrawer';
import { StepIconDefault } from './default/StepIconDefault';
import { StepIconMinimal } from './minimal/StepIconMinimal';

export interface StepIconProps {
  shipment: Shipment;
  config: TrackingConfig;
}

export const StepIcon = ({ config, shipment }: StepIconProps) => {
  return config.style.variant === 'minimal' ? (
    <StepIconMinimal shipment={shipment} config={config} />
  ) : (
    <StepIconDefault shipment={shipment} config={config} />
  );
};
