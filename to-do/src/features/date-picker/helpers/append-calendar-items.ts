import { stateManager } from '@state/index.ts';

import { createCalendarItemComponent } from '@components/calendar-item.ts';

export function appendCalendarItems(dates: Date[], container: HTMLDivElement): void {
    dates.forEach((date) => {
        const day = date.toLocaleString('en-US', { weekday: 'short' });
        const dateNumber = date.getDate();
        const calendarItem = createCalendarItemComponent(day, dateNumber, date);

        calendarItem.addEventListener('click', () => {
            stateManager.setSelectedDate(date);
        });

        container.appendChild(calendarItem);
    });
}
