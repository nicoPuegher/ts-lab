import { appendCalendarItems } from '@features/calendar-carousel/helpers/append-calendar-items.ts';
import { generateWeek } from '@features/calendar-carousel/helpers/generate-week.ts';

export function createCalendarCarousel(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('calendar-carousel');

    const dates = generateWeek();
    appendCalendarItems(dates, container);

    return container;
}
