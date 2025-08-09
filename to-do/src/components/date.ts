import { formatDate } from '@/utils/format-date.ts';

import { stateManager } from '@state/index.ts';

export function createDateComponent(weekday: string, dayOfMonth: number, date: Date) {
    const selectedDateFromState = stateManager.getState().selectedDate;
    const formattedDate = formatDate(date);
    const isSelected = selectedDateFromState == formattedDate;

    const container = document.createElement('button');
    container.id = formattedDate;
    container.classList.add('date-component', 'secondary');

    if (selectedDateFromState == formattedDate) {
        container.classList.remove('secondary');
        container.classList.add('primary');
    }

    const weekdayElement = document.createElement('span');
    weekdayElement.textContent = weekday.toUpperCase();
    weekdayElement.classList.add('weekday');

    const dayOfMonthElement = document.createElement('span');
    dayOfMonthElement.textContent = dayOfMonth.toString();
    dayOfMonthElement.classList.add('day-of-month');

    container.append(weekdayElement, dayOfMonthElement);

    return container;
}
