import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

/**
 * https://date-fns.org/
 * @param date
 * @returns
 */
export const getFormatDistanceToNow = (date: number) => {
  //   const fromNow = formatDistanceToNow(date, { locale: es }); // to spanish language
  const fromNow = formatDistanceToNow(date);
  return `${fromNow}`;
};
