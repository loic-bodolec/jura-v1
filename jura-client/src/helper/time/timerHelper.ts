import { format, formatDistanceToNowStrict } from 'date-fns';
import { fr } from 'date-fns/locale';

const locales = { fr };
const formats = { short: 'd MMM', long: 'd MMMM' };

export const getDateBagdeDisplayDate = (date: Date): string => format(date, formats.short, { locale: locales.fr });

export const getDaysDiff = (date: Date): number => {
  const today = new Date();
  const diff = parseInt(formatDistanceToNowStrict(date, { unit: 'day' }), 10);
  return date < today ? -diff : diff;
};
