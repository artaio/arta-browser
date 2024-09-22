import { StepIconProps } from '..';
import { CompleteMinimal } from './CompleteMinimal';
import { PendingMinimal } from './PendingMinimal';
import { CollectedMinimal } from './CollectedMinimal';
import { ConfirmedMinimal } from './ConfirmedMinimal';
import { InTransitMinimal } from './InTransitMinimal';

export const StepIconMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <div class="artajs__drawer__step">
        {shipment.status === 'pending' && <PendingMinimal config={config} shipment={shipment}/>}
        {shipment.status === 'collected' && <CollectedMinimal config={config} shipment={shipment}/>}
        {shipment.status === 'confirmed' && <ConfirmedMinimal config={config} shipment={shipment}/>}
        {shipment.status === 'in_transit' && <InTransitMinimal config={config} shipment={shipment}/>}
        {shipment.status === 'completed' && <CompleteMinimal config={config} shipment={shipment}/>}
      </div>
    </div>
  );
};
