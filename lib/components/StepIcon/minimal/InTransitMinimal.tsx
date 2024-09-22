import { StepIconProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { InTransitDate } from '../InTransitDate';
import { InTransitIcon } from './icons/InTransitIcon';

export const InTransitMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <InTransitIcon text={config.text.inTransitLabel} />
      <SimpleDate date={shipment.in_transit_at} dateConfig={config.text.dates} />
      <div class="artajs__drawer__step__icon__container"></div>
      <InTransitDate shipment={shipment} config={config} />
    </div>
  );
};
