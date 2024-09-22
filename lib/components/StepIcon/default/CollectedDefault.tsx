import { StepIconProps } from '..';
import { CollectedIcon } from './icons/CollectedIcon';
import { StepCTA } from '../StepCTA';

export const CollectedDefault = ({ shipment, config }: StepIconProps) => {
  return (
    <div class="artajs__flex__wraper">
      <CollectedIcon shipment={shipment} config={config} />
      <div class="artajs__drawer__step__icon__container"></div>
      <StepCTA text={config.text.checkBackLater} />
    </div>
  );
};
