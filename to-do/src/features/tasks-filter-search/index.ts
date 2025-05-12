import { Search, X, createElement } from 'lucide';

import { stateManager } from '@state/index.ts';

import { createLabelComponent } from '@components/label';
import { createSearchInputComponent } from '@components/search-input';

export function createTasksFilterSearch(): HTMLDivElement {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');

    const searchIcon = createElement(Search);
    searchIcon.classList.add('search-icon');

    const closeIcon = createElement(X);
    closeIcon.id = 'close-icon';
    closeIcon.classList.add('close-icon');
    closeIcon.addEventListener('click', () => handleRemoveSearchContent(searchInput.id));

    const debouncedCallback = debounce((term: string) => stateManager.setSearchTerm(term), 300);

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

    searchContainer.append(searchIcon, label, searchInput, closeIcon);

    requestAnimationFrame(() => {
        const renderedCloseIcon = document.getElementById('close-icon');
        renderedCloseIcon.addEventListener('click', () => handleRemoveSearchContent(searchInput.id));
    });

    return searchContainer;
}

function handleRemoveSearchContent(id: string) {
    const searchInput = document.getElementById(id) as HTMLInputElement;
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
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
