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

export const parseStringDate = (date: string | Date) => {
  const jsDate = new Date(date);
  const weekday = weekdays[jsDate.getDay()];
  const month = months[jsDate.getMonth()];
  const year = jsDate.getFullYear();
  return {
    weekday,
    month,
    day: jsDate.getDate(),
    year,
  };
};
