import { StepIconProps } from '..';
import { InTransitDate } from '../InTransitDate';
import { InTransitIcon } from './icons/InTransitIcon';


export const InTransitDefault = ({ shipment, config }: StepIconProps) => {

  return (
    <div class="artajs__flex__wrapper">
      <InTransitIcon shipment={shipment} config={config} />
      <div class="artajs__drawer__step__icon__container"></div>
      <InTransitDate shipment={shipment} config={config} />
    </div>
  );
};
