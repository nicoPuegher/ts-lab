export function createTaskFilter(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('filter-container');

    const allButton = createButtonComponent('All', 'filter');
    const activeButton = createButtonComponent('Active', 'filter');
    const completedButton = createButtonComponent('Completed', 'filter');

    return container;
}
