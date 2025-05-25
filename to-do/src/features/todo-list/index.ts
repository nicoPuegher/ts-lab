import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { createTodoComponent } from '@components/todo.ts';

type TodoFilters = 'all' | 'active' | 'completed';

const DELAY = 10;

export function createTodoList(): HTMLUListElement {
    const ul = document.createElement('ul');
    let scrollToLastTodoTimeout: ReturnType<typeof setTimeout> | null = null;

    stateManager.subscribeStateChange((newTodo?: Todo) => {
        appendTodos(ul, newTodo);

        if (newTodo) {
            if (scrollToLastTodoTimeout) clearTimeout(scrollToLastTodoTimeout);
            scrollToLastTodoTimeout = setTimeout(() => scrollToLastTodo(ul), DELAY);
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

function appendNewTodo(ul: HTMLUListElement, newTodo: Todo): void {
    const li = createTodoComponent(newTodo);
    ul.appendChild(li);
}

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

function scrollToLastTodo(ul: HTMLUListElement): void {
    ul.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
}
