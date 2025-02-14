const WEEK_DAYS = 7;

export function generateWeek(): Date[] {
    return Array.from({ length: WEEK_DAYS }, (_, i) => {
        const date = new Date();
        const newDay = date.getDate() + i;
        date.setDate(newDay);

        return date;
    });
}
