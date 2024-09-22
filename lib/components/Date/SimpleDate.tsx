import { parseStringDate } from '.';
import type { DateConfig } from '../../trackingConfig';

export interface SimpleDateProps {
  date: string | null;
  dateConfig: DateConfig;
}

export const SimpleDate = ({ date, dateConfig }: SimpleDateProps) => {

  if (date == null) {
    // TODO: check how we want to handle these
    return <div class="artajs__drawer__date">N/A</div>;
  }

  const { weekday, month, day } = parseStringDate(date);
  return (
    <div class="artajs__drawer__date">
      {`${dateConfig.weekdays[weekday]}, ${dateConfig.months[month]
        } ${day}`}
    </div>
  );
};
