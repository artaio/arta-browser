import { StepIconProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { StepCTA } from '../StepCTA';
import { ConfirmedIcon } from './icons/ConfirmedIcon';

export const ConfirmedMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wrapper">
      <ConfirmedIcon text={config.text.confirmedLabel} />
      <SimpleDate date={shipment.confirmed_at} dateConfig={config.text.dates} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.checkBackLater} />
    </div>
  );
};
