import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { removeIds } from '@features/tasks-list/helpers/remove-ids.ts';
import { setNewTodo } from '@features/tasks-list/helpers/setNewTodo.ts';
import { updateExistingTodo } from '@features/tasks-list/helpers/update-existing-todo.ts';
import { updateTodos } from '@features/tasks-list/helpers/update-todos.ts';

export function createTasksList(): HTMLUListElement {
    const elementsMap = new Map<string, HTMLLIElement>();
    // eslint-disable-next-line prefer-const
    let currentTodos: Todo[] = [];

    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos: newTodos }: { todos: Todo[] } = stateManager.getState();

        removeIds({ elementsMap, currentTodos, newTodos });

        newTodos.forEach((todo) => {
            const existingLi: HTMLLIElement = elementsMap.get(todo.id);

            if (existingLi) {
                updateExistingTodo({ existingLi, currentTodos, todo });
            } else {
                setNewTodo({ elementsMap, todo });
            }

            updateTodos({ elementsMap, currentTodos, newTodos, ul });
        });
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
