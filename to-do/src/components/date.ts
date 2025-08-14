import { formatDate } from '@/utils/format-date.ts';

import { stateManager } from '@state/index.ts';

export function createDateComponent(weekday: string, dayOfMonth: number, date: Date) {
    const selectedDateFromState = stateManager.getState().selectedDate;
    const formattedDate = formatDate(date);
    const isSelected = selectedDateFromState == formattedDate;

    const container = document.createElement('button');
    container.id = formattedDate;
    container.setAttribute('role', 'tab');
    container.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    isSelected && container.setAttribute('aria-current', 'date');
    container.setAttribute(
        'aria-label',
        `${weekday} ${dayOfMonth}, ${date.toLocaleString('default', { month: 'long' })}`,
    );
    container.setAttribute('tabindex', '-1');
    container.classList.add('date-component', 'focusable', isSelected ? 'primary' : 'secondary');
    container.addEventListener('click', () => handleClick(container, date));

    const weekdayElement = document.createElement('span');
    weekdayElement.textContent = weekday.toUpperCase();
    weekdayElement.classList.add('weekday');

    const dayOfMonthElement = document.createElement('span');
    dayOfMonthElement.textContent = dayOfMonth.toString();
    dayOfMonthElement.classList.add('day-of-month');

    container.append(weekdayElement, dayOfMonthElement);

    return container;
}

function handleClick(container: HTMLButtonElement, date: Date) {
    const previousSelectedDate = stateManager.getState().selectedDate;
    const previousSelectedDateButton = document.getElementById(previousSelectedDate);

    if (!(previousSelectedDateButton instanceof HTMLButtonElement)) return;

    previousSelectedDateButton.setAttribute('aria-selected', 'false');

    container.classList.remove('secondary');
    container.classList.add('primary');
}
