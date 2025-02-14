import { createCalendarItemComponent } from '@components/calendar-item.ts';

import { generateWeek } from '@features/calendar-carousel/helpers/generate-week.ts';

export function createCalendarCarousel(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('calendar-carousel');

    const dates = generateWeek();

    dates.forEach((date) => {
        const day = date.toLocaleString('en-US', { weekday: 'short' });
        const dateNumber = date.getDate();
        const calendarItem = createCalendarItemComponent(day, dateNumber);

        container.appendChild(calendarItem);
    });

    return container;
}
