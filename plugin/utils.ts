import {t} from "adnbn/locale";

import {differenceInCalendarDays} from "date-fns";

export function getDiffDays(timestamp: number, currentTime: number): number {
    return differenceInCalendarDays(timestamp, currentTime);
}

export function getDateString(timestamp: number): string {
    const date = new Date(timestamp);

    // @ts-ignore
    return t(`addon_pay.date_until.${date.getMonth() + 1}`, {
        day: date.getDate(),
        year: date.getFullYear(),
    });
}
