export function createSearchInputComponent() {
    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.type = 'search';
    searchInput.placeholder = 'Search for a to-do...';

    return searchInput;
}
