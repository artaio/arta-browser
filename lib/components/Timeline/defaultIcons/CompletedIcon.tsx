import type { TimelineProps } from '..';
import { SimpleDate } from '../../Date/SimpleDate';
import { CompletedIconBase } from '../icons/CompletedIconBase';

export const CompletedIcon = ({ config, shipment }: TimelineProps) => {
  return (
    <div class="artajs__tracking__timeline__default__step__icon">
      <CompletedIconBase config={config} />
      <div class="artajs__tracking__timeline__status__text__wrapper">
        <div class="artajs__tracking__timeline__status__text__large">
          {config.text.completedLabel}
        </div>
        <SimpleDate
          date={shipment.completed_at}
          dateConfig={config.text.dates}
        />
      </div>
    </div>
  );
};
