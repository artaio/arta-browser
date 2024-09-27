import { TrackingConfig } from '../../trackingConfig';
import { parseStringDate } from '../Date';

interface BlackStepProps {
  text: string;
  date: string | null;
  config: TrackingConfig;
}

export const CheckedStep = ({ text, date, config }: BlackStepProps) => {
  const {
    text: { dates: dateConfig },
  } = config;
  const parsedDate = date ? parseStringDate(date) : null;
  const finalDate = parsedDate
    ? `${dateConfig.weekdays[parsedDate.weekday]}, ${
        dateConfig.months[parsedDate.month]
      } ${parsedDate.day}`
    : '';

  return (
    <div class="artajs__tracking__timeline__step">
      {/* TODO use color primary?? */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="6" fill="#110F10" />
      </svg>
      <div class="artajs__tracking__timeline__status__text__wrapper">
        <div class="artajs__tracking__timeline__step__text__primary">
          {text}
        </div>
        <div class="artajs__tracking__timeline__status__date">
          <div class="artajs__tracking__timeline__status__date__secondary">
            {finalDate}
          </div>
        </div>
      </div>
    </div>
  );
};
