import { stateManager } from '@state/index.ts';

import { createDateComponent } from '@components/date.ts';

import { generateWeek } from '@features/date-picker/helpers/generate-week.ts';
import { getPreviousDates } from '@features/date-picker/helpers/get-previous-dates.ts';

export function createDatePicker(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('date-picker');

    const userStorage: string | null = window.localStorage.getItem('taskData');

    const previousDates = getPreviousDates(userStorage);
    const currentDates = generateWeek();
    const dates = [...previousDates, ...currentDates];

    appendDateComponents(dates, container);

    return container;
}

function appendDateComponents(dates: Date[], container: HTMLDivElement): void {
    dates.forEach((date) => {
        const weekday = date.toLocaleString('en-US', { weekday: 'short' });
        const dayOfMonth = date.getDate();

        const dateComponent = createDateComponent(weekday, dayOfMonth, date);
        dateComponent.addEventListener('click', () => stateManager.setSelectedDate(date));

        container.appendChild(dateComponent);
    });
}
