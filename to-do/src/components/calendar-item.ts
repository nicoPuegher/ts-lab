export function createCalendarItemComponent(day: string, date: number): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('calendar-item');

    const dayElement = document.createElement('span');
    dayElement.textContent = day.toUpperCase();

    const dateElement = document.createElement('span');
    dateElement.textContent = date.toString();

    div.append(dayElement, dateElement);

    return div;
}
