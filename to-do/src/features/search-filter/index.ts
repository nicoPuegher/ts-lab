import { Search, X, createElement } from 'lucide';

import { stateManager } from '@state/index.ts';

import { createLabelComponent } from '@components/label';
import { createSearchInputComponent } from '@components/search-input';

const TIMER = 300;
const EMPTY_STRING = '';

export function createSearchFilter(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('search-filter');

    const searchIcon = createElement(Search);

    const closeIcon = createElement(X);
    closeIcon.id = 'close-icon';
    closeIcon.classList.add('hide-icon');
    closeIcon.addEventListener('click', () => handleEmptySearch(searchInput.id));

    const searchInput = createSearchInputComponent();
    searchInput.addEventListener('input', (event) => handleSearchTyping(event, closeIcon.id));

    const label = createLabelComponent(searchInput.id, 'Search todo');

    container.append(searchIcon, label, searchInput, closeIcon);

    return container;
}

function handleEmptySearch(id: string): void {
    const searchInput = document.getElementById(id);

    if (searchInput instanceof HTMLInputElement) {
        searchInput.value = EMPTY_STRING;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    }
}

const debouncedCallback = debounce((term: string) => stateManager.setSearchTerm(term), TIMER);

function handleSearchTyping(event: Event, id: string): void {
    const searchInput = event.target;
    const closeIcon = document.getElementById(id);

    if (!(searchInput instanceof HTMLInputElement)) return;
    if (!closeIcon) return;

    const trimmedValue = searchInput.value.trim();
    closeIcon.classList.toggle('hide-icon', trimmedValue == EMPTY_STRING);

    if (trimmedValue != EMPTY_STRING) {
        debouncedCallback(trimmedValue);
    } else {
        debouncedCallback.cancel();
        stateManager.setSearchTerm(EMPTY_STRING);
    }
}

function debounce(callback: (arg: string) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const debounced = (arg: string) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(arg), delay);
    };

    debounced.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return debounced;
}
