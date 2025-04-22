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

function handleRemoveSearchContent(id: string) {
    const searchInput = document.getElementById(id) as HTMLInputElement;
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
}

function debounce(callback: (arg: string) => void, delay: number): (arg: string) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (arg: string) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(arg), delay);
    };
}
