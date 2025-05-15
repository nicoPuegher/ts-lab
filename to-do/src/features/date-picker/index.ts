import { appendCalendarItems } from '@features/calendar-carousel/helpers/append-calendar-items.ts';
import { generateWeek } from '@features/calendar-carousel/helpers/generate-week.ts';
import { getPreviousDates } from '@features/calendar-carousel/helpers/get-previous-dates.ts';

export function createDatePicker(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('date-picker');

    const userStorage: string | null = window.localStorage.getItem('taskData');

    const previousDates = getPreviousDates(userStorage);
    const currentDates = generateWeek();
    const dates = [...previousDates, ...currentDates];

    appendCalendarItems(dates, container);

    return container;
}
