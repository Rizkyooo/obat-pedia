import { formatInTimeZone, add, format } from 'date-fns-tz';
import { addHours } from "date-fns";

export const originalDate = (dates) => {
    const date = new Date(dates);
    const makassarTime = formatInTimeZone(date, 'Asia/Makassar', 'HH:mm');
    const dateWithAddedHours = addHours(new Date(`${date.toDateString()} ${makassarTime}`), 8);
    return format(dateWithAddedHours, 'HH:mm');
  }