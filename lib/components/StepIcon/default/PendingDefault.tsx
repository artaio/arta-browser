import { StepIconProps } from '..';
import { StepCTA } from '../StepCTA';
import { PendingIcon } from './icons/PendingIcon';

export const PendingDefault = ({ config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wrapper">
      <PendingIcon config={config} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.checkBackLater} />
    </div>
  );
};
