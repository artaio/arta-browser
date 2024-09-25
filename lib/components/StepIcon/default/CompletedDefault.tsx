import { StepIconProps } from '..';
import { CompletedIcon } from './icons/CompletedIcon';
import { StepCTA } from '../StepCTA';
import { LargeDate } from '../../Date/LargeDate';

export const CompletedDefault = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wrapper">
      <CompletedIcon shipment={shipment} config={config} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.completedCTA} />
      <LargeDate date={shipment.updated_at} dateConfig={config.text.dates} />
    </div>
  );
};
