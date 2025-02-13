import { createCalendarItemComponent } from '@components/calendar-item.ts';

export function createCalendarCarousel(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('calendar-carousel');

    function generateWeek() {
        const weekDays = 7;

        return Array.from({ length: weekDays }, (_, i) => {
            const date = new Date();
            const newDay = date.getDate() + i;
            date.setDate(newDay);

            return date;
        });
    }

    const dates = generateWeek();

    dates.forEach((date) => {
        const day = date.toLocaleString('en-US', { weekday: 'short' });
        const dateNumber = date.getDate();
        const calendarItem = createCalendarItemComponent(day, dateNumber);

        container.appendChild(calendarItem);
    });

    return container;
}
