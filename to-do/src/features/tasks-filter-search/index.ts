export function createTasksFilterSearch(): HTMLDivElement {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');

    const searchIcon = document.createElement('i');
    searchIcon.setAttribute('data-lucide', 'search');
    searchIcon.classList.add('search-icon');

    const closeIcon = document.createElement('i');
    closeIcon.id = 'close-icon';
    closeIcon.setAttribute('data-lucide', 'x');
    closeIcon.classList.add('close-icon');

    return searchContainer;
}
