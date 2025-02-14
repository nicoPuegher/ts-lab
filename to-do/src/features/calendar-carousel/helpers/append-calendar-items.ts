import { createCalendarItemComponent } from '@components/calendar-item';

export function appendCalendarItems(dates: Date[], container: HTMLDivElement): void {
    dates.forEach((date) => {
        const day = date.toLocaleString('en-US', { weekday: 'short' });
        const dateNumber = date.getDate();
        const calendarItem = createCalendarItemComponent(day, dateNumber);

        container.appendChild(calendarItem);
    });
}
