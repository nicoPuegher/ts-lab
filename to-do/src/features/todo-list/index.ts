import { checkContainerBounds } from '@/helpers/check-container-bounds.ts';
import type { ContainerBounds } from '@/helpers/check-container-bounds.ts';
import { setupScrollBoundsHandler } from '@/helpers/setup-scroll-bounds-handler.ts';

import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { createTodoComponent } from '@components/todo.ts';

import type { FocusState } from '@features/types/index.ts';

type TodoFilters = 'all' | 'active' | 'completed';

const DELAY = 10;

export function createTodoList() {
    const ul = document.createElement('ul');
    let scrollToLastTodoTimeout: ReturnType<typeof setTimeout> | null = null;

    const containerBounds: ContainerBounds = {
        container: ul,
        axis: 'vertical',
        startClass: 'at-top',
        endClass: 'at-bottom',
    };

    stateManager.subscribeStateChange((newTodo?: Todo) => {
        appendTodos(ul, newTodo);

        if (newTodo) {
            if (scrollToLastTodoTimeout) clearTimeout(scrollToLastTodoTimeout);
            scrollToLastTodoTimeout = setTimeout(() => scrollToLastTodo(ul), DELAY);
        }

        setupScrollBoundsHandler(checkContainerBounds, containerBounds);
        setTimeout(() => checkContainerBounds(containerBounds), 0);
    });

    appendTodos(ul);

    setupScrollBoundsHandler(checkContainerBounds, containerBounds);
    setTimeout(() => checkContainerBounds(containerBounds), 0);

    return ul;
}

function appendTodos(ul: HTMLUListElement, newTodo?: Todo) {
    if (newTodo) {
        appendNewTodo(ul, newTodo);
    } else {
        replaceAllTodos(ul);
    }
}

function appendNewTodo(ul: HTMLUListElement, newTodo: Todo) {
    const li = createTodoComponent(newTodo);
    ul.appendChild(li);
}

function replaceAllTodos(ul: HTMLUListElement) {
    const state = stateManager.getState();
    const previousTodosInState = state.todosByDate[state.selectedDate] || [];
    const filteredTodos = filterTodos(previousTodosInState, state.selectedFilter, state.searchTerm);
    const fragment = document.createDocumentFragment();

    filteredTodos.forEach((todo) => fragment.appendChild(createTodoComponent(todo)));

    ul.replaceChildren(fragment);
}

function filterTodos(todos: Todo[], filter: TodoFilters, searchTerm: string) {
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

    filteredTodos = filteredTodos.filter((todo) => todo.text.includes(searchTerm));

    return filteredTodos;
}

function scrollToLastTodo(ul: HTMLUListElement) {
    const lastChild = ul.lastElementChild;
    if (!lastChild || !(lastChild instanceof HTMLElement)) return;

    const start = ul.scrollTop;
    const end = lastChild.offsetTop;
    const duration = 500;
    let startTime: number | null = null;

    const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        ul.scrollTop = start + (end - start) * progress;

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };

    requestAnimationFrame(animateScroll);
}
