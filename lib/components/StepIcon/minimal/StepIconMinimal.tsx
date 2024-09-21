import { StepIconProps } from '..';
import { CollectedMinimal } from './CollectedMinimal';
// import { ConfirmedMinimal } from './ConfirmedMinimal';
// import { PendingMinimal } from "./PendingMinimal";

export const StepIconMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <div class="artajs__drawer__step">
        {/* {shipment.status === 'pending' && <PendingMinimal config={config} shipment={shipment}/>} */}
        {shipment.status === 'pending' && (
          <CollectedMinimal config={config} shipment={shipment} />
        )}
      </div>
    </div>
  );
};
