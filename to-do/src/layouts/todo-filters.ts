export function createTodoFiltersLayout(): HTMLDivElement {
    const todoFiltersContainer = document.createElement('div');
    todoFiltersContainer.classList.add('todo-filters-container');

    return todoFiltersContainer;
}
