export function createDateComponent(weekday: string, dayOfMonth: number, date: Date) {
    const container = document.createElement('div');
    container.id = date.toLocaleDateString().toString();
    container.classList.add('date-component');

    const weekdayElement = document.createElement('span');
    weekdayElement.textContent = weekday.toUpperCase();

    const dayOfMonthElement = document.createElement('span');
    dayOfMonthElement.textContent = dayOfMonth.toString();

    container.append(weekdayElement, dayOfMonthElement);

    return container;
}
