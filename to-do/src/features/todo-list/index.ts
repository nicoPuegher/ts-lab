import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { createTodoComponent } from '@components/todo.ts';

import { scrollToLast } from '@features/todo-list/helpers/scroll-to-last.ts';

type TodoFilters = 'all' | 'active' | 'completed';

let scrollTimeout: number | null = null;
export function createTodoList(): HTMLUListElement {
    const ul = document.createElement('ul');

    stateManager.subscribeStateChange((newTodo?: Todo) => {
        appendTodos(ul, newTodo);

        if (newTodo) {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => scrollToLast(ul), 10);
        }
    });

    appendTodos(ul);

    return ul;
}

function appendTodos(ul: HTMLUListElement, newTodo?: Todo): void {
    const state = stateManager.getState();

    if (newTodo) {
        const li = createTodoComponent(newTodo);
        ul.appendChild(li);
    } else {
        const currentTodos = state.todosByDate[state.selectedDate] || [];
        const fragment = document.createDocumentFragment();

        const filteredTodos = filterTodos(currentTodos, state.currentFilter);
        filteredTodos.forEach((todo) => {
            const li = createTodoComponent(todo);
            fragment.appendChild(li);
        });

        ul.replaceChildren(fragment);
    }
}

function filterTodos(todos: Todo[], filter: TodoFilters): Todo[] {
    const state = stateManager.getState();
    let filteredTodos: Todo[] = [];

    switch (filter) {
        case 'active':
            filteredTodos = todos.filter((todo) => !todo.completed);
            break;
        case 'completed':
            filteredTodos = todos.filter((todo) => todo.completed);
            break;
        default:
            filteredTodos = todos;
    }

    filteredTodos = filteredTodos.filter((todo) => todo.text.includes(state.searchTerm));

    return filteredTodos;
}
