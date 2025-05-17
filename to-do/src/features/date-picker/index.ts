import { stateManager } from '@state/index.ts';
import type { AppState } from '@state/types/index.ts';

import { createDateComponent } from '@components/date.ts';

import { generateWeek } from '@features/date-picker/helpers/generate-week.ts';

const TIMEZONE_NORMALIZATION_SUFFIX = 'T00:00:00';

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

export function getPreviousDates(userStorage: string | null): Date[] {
    if (!userStorage) return [];

    const todayDateString = new Date().toISOString().split('T')[0];
    const storedState: AppState = JSON.parse(userStorage);

    return Object.keys(storedState.todosByDate)
        .filter((date) => date < todayDateString)
        .map((date) => new Date(date + TIMEZONE_NORMALIZATION_SUFFIX))
        .sort((a, b) => a.getTime() - b.getTime());
}

function generateDayListFromToday(): Date[] {
    return Array.from({ length: DAYS_TO_GENERATE }, (_, i) => {
        const date = new Date();
        const nextDay = date.getDate() + i;

        date.setDate(nextDay);

        return date;
    });
}
