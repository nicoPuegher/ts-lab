import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { createTaskComponent } from '@components/task.ts';

import { removeIds } from '@features/tasks-list/helpers/remove-ids.ts';
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
                const oldTodo: Todo = currentTodos.find((currentTodo) => currentTodo.id === todo.id);

                if (oldTodo) {
                    const checkbox: HTMLInputElement = existingLi.querySelector('input[type="checkbox"]');
                    const paragraph: HTMLParagraphElement = existingLi.querySelector('p');

                    if (oldTodo.text != todo.text) {
                        paragraph.textContent = todo.text;
                    }

                    if (oldTodo.completed != todo.completed) {
                        checkbox.checked = todo.completed;
                        existingLi.classList.toggle('completed', todo.completed);
                        existingLi.lastElementChild.classList.toggle('removed', todo.completed);
                    }
                }
            } else {
                const li: HTMLLIElement = createTaskComponent(todo.id, todo.text);
                if (todo.completed) {
                    li.classList.add('completed');
                    li.lastElementChild.classList.add('removed');
                }

                const checkbox: HTMLInputElement = li.querySelector('input[type="checkbox"]');
                checkbox.checked = todo.completed;

                elementsMap.set(todo.id, li);
            }

            updateTodos({ elementsMap, currentTodos, newTodos, ul });
        });
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
