import { StepIconProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { StepCTA } from '../StepCTA';
import { CollectedIcon } from './icons/CollectedIcon';

export const CollectedMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <CollectedIcon text={config.text.collectedLabel} />
      <SimpleDate date={shipment.collected_at} dateConfig={config.text.dates} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.checkBackLater} />
    </div>
  );
};
