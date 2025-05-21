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
    closeIcon.addEventListener('click', handleEmptySearch);

    const searchInput = createSearchInputComponent();
    searchInput.addEventListener('input', (event) => {
        const inputText = event.target as HTMLInputElement;
        const trimmedValue = inputText.value.trim();
        const closeIcon = document.getElementById('close-icon');

        if (trimmedValue !== '') {
            debouncedCallback(trimmedValue);
            closeIcon.classList.add('show-close-icon');
        } else {
            debouncedCallback.cancel();
            stateManager.setSearchTerm('');
            closeIcon.classList.remove('show-close-icon');
        }
    });

    const label = createLabelComponent(searchInput.id, 'Search todo');

    container.append(searchIcon, label, searchInput, closeIcon);

    return container;
}

function handleEmptySearch(): void {
    const searchInput = document.getElementById('search-input');

    if (searchInput instanceof HTMLInputElement) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    }
}

const debouncedCallback = debounce((term: string) => stateManager.setSearchTerm(term), TIMER);

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
