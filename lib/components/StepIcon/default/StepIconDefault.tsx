import type { StepIconProps } from '..';

export const StepIconDefault = ({ shipment, config }: StepIconProps) => {
  return <div>Default {JSON.stringify(shipment, null, 2)}</div>;
};
