export function createSearchInputComponent() {
    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', 'Search for a to-do...');
    searchInput.setAttribute('tabindex', '0');

    return searchInput;
}
