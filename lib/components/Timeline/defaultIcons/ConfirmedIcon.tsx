import type { TimelineProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { ConfirmedIconBase } from '../icons/ConfirmedIconBase';

export const ConfirmedIcon = ({ config, shipment }: TimelineProps) => {
  return (
    <div class="artajs__tracking__timeline__default__step__icon">
      <ConfirmedIconBase config={config} />
      <div class="artajs__tracking__timeline__status__text__wrapper">
        <div class="artajs__tracking__timeline__status__text__large">
          {config.text.confirmedLabel}
        </div>
        <SimpleDate
          date={shipment.confirmed_at}
          dateConfig={config.text.dates}
        />
      </div>
    </div>
  );
};
