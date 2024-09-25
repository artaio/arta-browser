import type { StepIconProps } from '..';
import { CollectedDefault } from './CollectedDefault';
import { InTransitDefault } from './InTransitDefault';
import { ConfirmedDefault } from './ConfirmedDefault';
import { PendingDefault } from './PendingDefault';
import { CompletedDefault } from './CompletedDefault';

export const StepIconDefault = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wrapper">
      <div class="artajs__drawer__step__large">
        {shipment.status === 'pending' && <PendingDefault config={config} shipment={shipment}/>}
        {shipment.status === 'collected' && <CollectedDefault config={config} shipment={shipment}/>}
        {shipment.status === 'confirmed' && <ConfirmedDefault config={config} shipment={shipment}/>}
        {shipment.status === 'in_transit' && <InTransitDefault config={config} shipment={shipment}/>}
        {shipment.status === 'completed' && <CompletedDefault config={config} shipment={shipment}/>}
      </div>
    </div>
  );
};
