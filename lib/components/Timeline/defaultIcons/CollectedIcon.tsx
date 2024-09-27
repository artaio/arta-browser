import type { TimelineProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { CollectedIconBase } from '../icons/CollectedIconBase';

export const CollectedIcon = ({ config, shipment }: TimelineProps) => {
  return (
    <div class="artajs__tracking__timeline__default__step__icon">
      <CollectedIconBase config={config} />
      <div class="artajs__tracking__timeline__status__text__wrapper">
        <div class="artajs__tracking__timeline__status__text__large">
          {config.text.collectedLabel}
        </div>
        <SimpleDate
          date={shipment.collected_at}
          dateConfig={config.text.dates}
        />
      </div>
    </div>
  );
};
