import { parseStringDate } from '.';
import type { DateConfig } from '../../trackingConfig';

export interface LargeDateProps {
  date: Date | string | null;
  dateConfig: DateConfig;
  minimal?: boolean;
}

export const LargeDate = ({ date, dateConfig, minimal }: LargeDateProps) => {

  if (date == null) {
    // TODO: check how we want to handle these
    return <div class="artajs__drawer__date artajs__minimal__date">N/A</div>;
  }

  const { weekday, month, day } = parseStringDate(date);
  return (
    <div>
      <div class={`artajs__drawer__date artajs__minimal__date ${!minimal ? 'artajs__text__bold' : ''}`}>
        {`${dateConfig.weekdays[weekday]}, ${dateConfig.months[month]}`}
      </div>
      <div class="artajs__drawer__text__huge">
        {`${day}`.padStart(2, '0')}
      </div>
    </div>
  );
};
