export function createCalendarItemComponent(day: string, dateNumber: number, date: Date): HTMLDivElement {
    const div = document.createElement('div');
    div.setAttribute('id', date.toLocaleDateString().toString());
    div.classList.add('calendar-item');

    const dayElement = document.createElement('span');
    dayElement.textContent = day.toUpperCase();

    const dateElement = document.createElement('span');
    dateElement.textContent = dateNumber.toString();

    div.append(dayElement, dateElement);

    return div;
}
