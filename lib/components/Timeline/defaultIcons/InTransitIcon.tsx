import type { TimelineProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { InTransitIconBase } from '../icons/InTransitIconBase';

export const InTransitIcon = ({ config, shipment }: TimelineProps) => {
  return (
    <div class="artajs__tracking__timeline__default__step__icon">
      <InTransitIconBase config={config} />
      <div class="artajs__tracking__timeline__status__text__wrapper">
        <div class="artajs__tracking__timeline__status__text__large">
          {config.text.inTransitLabel}
        </div>
        <SimpleDate
          date={shipment.in_transit_at}
          dateConfig={config.text.dates}
        />
      </div>
    </div>
  );
};
