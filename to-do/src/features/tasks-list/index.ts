import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types';

import { createTaskComponent } from '@components/task.ts';

export function createTasksList(): HTMLUListElement {
    const elementsMap = new Map<string, HTMLLIElement>();
    let currentTodos: Todo[] = [];

    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos: newTodos }: { todos: Todo[] } = stateManager.getState();

        const currentIds = new Set<string>(currentTodos.map((currentTodo) => currentTodo.id));
        const newIds = new Set<string>(newTodos.map((newTodo) => newTodo.id));
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
