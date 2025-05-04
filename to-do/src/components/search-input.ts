export function createSearchInputComponent(): HTMLInputElement {
    const searchInput: HTMLInputElement = document.createElement('input');
    searchInput.id = 'search-input-id';
    searchInput.type = 'search';
    searchInput.placeholder = 'Search for a task...';

    return searchInput;
}
