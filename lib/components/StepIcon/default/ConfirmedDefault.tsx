import { StepIconProps } from '..';
import { StepCTA } from '../StepCTA';
import { ConfirmedIcon } from './icons/ConfirmedIcon';

export const ConfirmedDefault = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wrapper">
      <ConfirmedIcon shipment={shipment} config={config} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.checkBackLater} />
    </div>
  );
};
