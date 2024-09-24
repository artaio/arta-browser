import { StepIconProps } from '..';
import { LargeDate } from '../../Date/LargeDate';
import { StepCTA } from '../StepCTA';
import { CompleteIcon } from './icons/CompleteIcon';

export const CompleteMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <CompleteIcon text={config.text.completedLabel} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.completedCTA} />
      <LargeDate date={shipment.completed_at} dateConfig={config.text.dates} />
    </div>
  );
};
