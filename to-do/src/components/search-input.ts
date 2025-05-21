export function createSearchInputComponent(): HTMLInputElement {
    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.type = 'search';
    searchInput.placeholder = 'Search for a todo...';

    return searchInput;
}
