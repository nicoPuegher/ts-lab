import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { createTaskComponent } from '@components/task';

import { scrollToLast } from '@features/tasks-list/helpers/scroll-to-last.ts';

type TodoFilters = 'all' | 'active' | 'completed';

let scrollTimeout: number | null = null;
export function createTasksList(): HTMLUListElement {
    const ul = document.createElement('ul');

    stateManager.subscribeStateChange((newTodo?: Todo) => {
        appendTasks(ul, newTodo);

        if (newTodo) {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => scrollToLast(ul), 10);
        }
    });

    appendTasks(ul);

    return ul;
}

function appendTasks(ul: HTMLUListElement, newTodo?: Todo): void {
    const state = stateManager.getState();

    if (newTodo) {
        const li = createTaskComponent(newTodo);
        ul.appendChild(li);
    } else {
        const currentTodos = state.todosByDate[state.selectedDate] || [];
        const fragment = document.createDocumentFragment();

        const filteredTodos = filterTodos(currentTodos, state.currentFilter as TodoFilters);
        filteredTodos.forEach((todo) => {
            const li = createTaskComponent(todo);
            fragment.appendChild(li);
        });

        ul.replaceChildren(fragment);
    }
}

function filterTodos(todos: Todo[], filter: TodoFilters): Todo[] {
    switch (filter) {
        case 'active':
            return todos.filter((todo) => !todo.completed);
        case 'completed':
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}
