import { createTasksFilterButtons } from '@features/tasks-filter-buttons/index.ts';
import { createTasksFilterSearch } from '@features/tasks-filter-search/index.ts';

export function createFilterLayout(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('todo-filters-container');

    const filterButtons = createTasksFilterButtons();
    const filterSearch = createTasksFilterSearch();

    todoFiltersContainer.append(filterButtons, filterSearch);

    return todoFiltersContainer;
}
