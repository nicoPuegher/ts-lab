import { Search, X, createElement } from 'lucide';

import { stateManager } from '@state/index.ts';

import { createLabelComponent } from '@components/label';
import { createSearchInputComponent } from '@components/search-input';

const TIMER = 300;
const EMPTY_STRING = '';

export function createSearchFilter() {
    const container = document.createElement('div');
    container.setAttribute('role', 'search');
    container.setAttribute('aria-label', 'To-do search');
    container.classList.add('search-filter', 'clean-input');

    const searchIcon = createElement(Search);
    searchIcon.setAttribute('aria-hidden', 'true');
    searchIcon.classList.add('icons');

    const closeIcon = createElement(X);
    closeIcon.id = 'close-icon';
    closeIcon.setAttribute('role', 'button');
    closeIcon.setAttribute('aria-label', 'Clear search');
    closeIcon.setAttribute('tabindex', '0');
    closeIcon.classList.add('icons', 'clickeable', 'hide-icon', 'focusable');
    closeIcon.addEventListener('click', () => handleEmptySearch(searchInput.id));
    closeIcon.addEventListener('keydown', (event) => handleKeydown(event, searchInput.id));

    const searchInput = createSearchInputComponent();
    searchInput.setAttribute('aria-describedby', 'search-instructions');
    searchInput.classList.add('clean-input', 'focusable');
    searchInput.addEventListener('input', (event) => handleSearchTyping(event, closeIcon.id));

    const label = createLabelComponent(searchInput.id, 'Search todo');

    container.append(searchIcon, label, searchInput, closeIcon);

    return container;
}

function handleEmptySearch(id: string) {
    const searchInput = document.getElementById(id);

    if (searchInput instanceof HTMLInputElement) {
        searchInput.value = EMPTY_STRING;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    }
}

function handleKeydown(event: KeyboardEvent, searchInputId: string) {
    if (event.key == 'Enter' || event.key == ' ') {
        event.preventDefault();
        handleEmptySearch(searchInputId);
    }
}

function handleSearchTyping(event: Event, id: string) {
    const searchInput = event.target;
    const closeIcon = document.getElementById(id);

    if (!(searchInput instanceof HTMLInputElement)) return;
    if (!closeIcon) return;

    const trimmedValue = searchInput.value.trim();
    closeIcon.classList.toggle('hide-icon', trimmedValue == EMPTY_STRING);

    if (trimmedValue != EMPTY_STRING) {
        debouncedSearch(trimmedValue);
    } else {
        debouncedSearch.cancel();
        stateManager.setSearchTerm(EMPTY_STRING);
    }
}

const debouncedSearch = debounce(function (term: string) {
    stateManager.setSearchTerm(term);
}, TIMER);

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
