import type { DateConfig } from '../../trackingConfig';

export interface SimpleDateProps {
  date: string;
  dateConfig: DateConfig;
}

const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;

export const SimpleDate = ({ date, dateConfig }: SimpleDateProps) => {
  const jsDate = new Date(date);
  const day = weekdays[jsDate.getDay()];
  const month = months[jsDate.getMonth()];
  return (
    <div class="artaja__drawer__date">
      {`${dateConfig.weekdays[day]}, ${
        dateConfig.months[month]
      } ${jsDate.getDate()}`}
    </div>
  );
};
