import { parseStringDate } from '.';
import type { DateConfig } from '../../trackingConfig';

export interface SimpleDateProps {
  date: string | null;
  dateConfig: DateConfig;
}

export const SimpleDate = ({ date, dateConfig }: SimpleDateProps) => {
  const parsedDate = date ? parseStringDate(date) : null;
  const finalDate = parsedDate
    ? `${dateConfig.weekdays[parsedDate.weekday]}, ${
        dateConfig.months[parsedDate.month]
      } ${parsedDate.day}`
    : '';

  return (
    <div class="artajs__tracking__timeline__status__date">
      <div class="artajs__tracking__timeline__status__date__content">
        {finalDate}
      </div>
    </div>
  );
};
