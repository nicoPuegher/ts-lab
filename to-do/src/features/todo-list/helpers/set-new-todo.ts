import { createTodoComponent } from '@components/todo.ts';

import type { newTodoProps } from '@features/todo-list/types/index.ts';

export function setNewTodo(props: newTodoProps): void {
    const li: HTMLLIElement = createTodoComponent(props.todo.id, props.todo.text);
    if (props.todo.completed) {
        li.classList.add('completed');
        li.lastElementChild.classList.add('removed');
    }

    const checkbox: HTMLInputElement = li.querySelector('input[type="checkbox"]');
    checkbox.checked = props.todo.completed;

    props.elementsMap.set(props.todo.id, li);
}
