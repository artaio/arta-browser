import { StepIconProps } from '..';
import { SimpleDate } from '../../SimpleDate';
import { CheckBackLater } from '../CheckBackLater';
import { CollectedIcon } from '../icons/CollectedIcon';

export const CollectedMinimal = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <CollectedIcon text={config.text.collectedLabel} />

      {/* TODO: update backend to expose confirmed_at, completed_at etc dates */}
      <SimpleDate date={shipment.created_at} dateConfig={config.text.dates} />
      <div class="artajs__drawer__step__icon__container"></div>
      <CheckBackLater config={config} />
    </div>
  );
};
