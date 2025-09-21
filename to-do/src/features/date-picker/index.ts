import { checkContainerBounds } from '@/helpers/check-container-bounds.ts';
import type { ContainerBounds } from '@/helpers/check-container-bounds.ts';
import { setupScrollBoundsHandler } from '@/helpers/setup-scroll-bounds-handler.ts';

import { STORAGE_KEY, stateManager } from '@state/index.ts';
import type { AppState } from '@state/types/index.ts';

import { createDateComponent } from '@components/date.ts';

import type { FocusState } from '@features/types/index.ts';

const TIMEZONE_NORMALIZATION_SUFFIX = 'T00:00:00';
const DAYS_TO_GENERATE = 7;

export function createDatePicker() {
    const focusState: FocusState = {
        currentFocusIndex: null,
    };

    const container = document.createElement('div');
    container.setAttribute('aria-label', 'Date picker');
    container.setAttribute('role', 'tablist');
    container.setAttribute('aria-orientation', 'horizontal');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('tabindex', '0');
    container.classList.add('date-picker', 'focusable');
    container.addEventListener('keydown', (event) => handleKeydown(event, focusState));

    const userStorage: string | null = window.localStorage.getItem(STORAGE_KEY);

    const storedPastDates = getStoredPastDates(userStorage);
    const dayListFromToday = generateDayListFromToday();
    const dates = [...storedPastDates, ...dayListFromToday];

    appendDateComponents(dates, container);

    const containerBounds: ContainerBounds = {
        container,
        axis: 'horizontal',
        startClass: 'at-start',
        endClass: 'at-end',
    };
    setupScrollBoundsHandler(checkContainerBounds, containerBounds);
    setTimeout(() => checkContainerBounds(containerBounds), 0);

    return container;
}

function handleKeydown(event: KeyboardEvent, focusState: FocusState) {
    if (!(event.currentTarget instanceof HTMLElement)) return;

    const datePicker = event.currentTarget;

    const state = stateManager.getState();
    const dates = Array.from(datePicker.children);

    if (focusState.currentFocusIndex == null) {
        focusState.currentFocusIndex = dates.findIndex((dateButton) => dateButton.id == state.selectedDate);
    }

    switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            event.preventDefault();

            const direction = event.key == 'ArrowLeft' ? -1 : 1;
            focusState.currentFocusIndex = (focusState.currentFocusIndex + direction + dates.length) % dates.length;
            const dateButton = dates[focusState.currentFocusIndex];

            if (dateButton instanceof HTMLButtonElement) {
                dateButton.focus();
                dateButton.scrollIntoView({ block: 'nearest', inline: 'center' });
            }

            break;
        case 'Home':
            event.preventDefault();
            focusState.currentFocusIndex = 0;

            break;
        case 'End':
            event.preventDefault();
            focusState.currentFocusIndex = -1;

            break;
        case 'Escape':
            datePicker.focus();
            focusState.currentFocusIndex = null;

            break;
        case 'Tab':
            focusState.currentFocusIndex = null;

            break;
    }
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

function appendDateComponents(dates: Date[], container: HTMLDivElement) {
    dates.forEach((date) => {
        const weekday = date.toLocaleString('en-US', { weekday: 'short' });
        const dayOfMonth = date.getDate();

        const dateComponent = createDateComponent(weekday, dayOfMonth, date);

        container.appendChild(dateComponent);
    });
}
