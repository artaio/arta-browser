import { StepIconProps } from '..';
import { CheckBackLater } from '../CheckBackLater';
import { PendingIcon } from '../icons/PendingIcon';

export const PendingMinimal = ({ config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <PendingIcon text={config.text.pendingLabel} />
      <div class="artajs__drawer__step__icon__container"></div>
      <CheckBackLater config={config} />
    </div>
  );
};
