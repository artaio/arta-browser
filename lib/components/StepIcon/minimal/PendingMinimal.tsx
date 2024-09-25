import { StepIconProps } from '..';
import { StepCTA } from '../StepCTA';
import { PendingIcon } from './icons/PendingIcon';

export const PendingMinimal = ({ config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wrapper">
      <PendingIcon text={config.text.pendingLabel} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.checkBackLater} />
    </div>
  );
};
