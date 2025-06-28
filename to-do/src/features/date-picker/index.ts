import { checkContainerBounds } from '@/helpers/check-container-bounds.ts';
import type { ContainerBounds } from '@/helpers/check-container-bounds.ts';
import { setupScrollBoundsHandler } from '@/helpers/setup-scroll-bounds-handler.ts';

import { STORAGE_KEY, stateManager } from '@state/index.ts';
import type { AppState } from '@state/types/index.ts';

import { createDateComponent } from '@components/date.ts';

const TIMEZONE_NORMALIZATION_SUFFIX = 'T00:00:00';
const DAYS_TO_GENERATE = 7;

export function createDatePicker() {
    const container = document.createElement('div');
    container.classList.add('date-picker');

    const userStorage: string | null = window.localStorage.getItem(STORAGE_KEY);

    const storedPastDates = getStoredPastDates(userStorage);
    const dayListFromToday = generateDayListFromToday();
    const dates = [...storedPastDates, ...dayListFromToday];

    appendDateComponents(dates, container);

    setTimeout(() => checkVisibleDates(container), 0);

    return container;
}

function appendDateComponents(dates: Date[], container: HTMLDivElement) {
    dates.forEach((date) => {
        const weekday = date.toLocaleString('en-US', { weekday: 'short' });
        const dayOfMonth = date.getDate();

        const dateComponent = createDateComponent(weekday, dayOfMonth, date);
        dateComponent.addEventListener('click', () => {
            dateComponent.classList.add('selected-date');

            stateManager.setSelectedDate(date);
        });

        container.appendChild(dateComponent);
    });
}

function getStoredPastDates(userStorage: string | null) {
    if (!userStorage) return [];

    const todayDateString = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const storedState: AppState = JSON.parse(userStorage);

    return Object.keys(storedState.todosByDate)
        .filter((date) => date < todayDateString)
        .map((date) => new Date(date + TIMEZONE_NORMALIZATION_SUFFIX))
        .sort((a, b) => a.getTime() - b.getTime());
}

function generateDayListFromToday() {
    return Array.from({ length: DAYS_TO_GENERATE }, (_, i) => {
        const date = new Date();
        const nextDay = date.getDate() + i;

        date.setDate(nextDay);

        return date;
    });
}

function setupScrollHandler(container: HTMLDivElement) {
    let isScrolling = false;

    function scrollHandler() {
        if (!isScrolling) {
            isScrolling = true;

            requestAnimationFrame(() => {
                checkVisibleDates(container);
                isScrolling = false;
            });
        }
    }

    container.addEventListener('scroll', scrollHandler);
}

function checkVisibleDates(container: HTMLDivElement) {
    const { firstElementChild, lastElementChild } = container;

    if (!firstElementChild || !lastElementChild) return;

    const containerRect = container.getBoundingClientRect();

    const firstVisible = firstElementChild.getBoundingClientRect().left >= containerRect.left;
    const lastVisible = lastElementChild.getBoundingClientRect().right <= containerRect.right;

    container.classList.toggle('at-start', firstVisible);
    container.classList.toggle('at-end', lastVisible);
}
