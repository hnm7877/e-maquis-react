import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

export const helperDate = (
  date: string | Date | null = new Date(),
  format: string = 'YYYY-MM-DD HH:mm:ss'
) => {
  const dateFormat = dayjs(date).format(format);

  if (dateFormat === 'Invalid Date') return '';
  return dateFormat;
};

export const helperResetDate = (date: string | Date) => {
  return dayjs(date).hour(0).minute(0).second(0);
};
