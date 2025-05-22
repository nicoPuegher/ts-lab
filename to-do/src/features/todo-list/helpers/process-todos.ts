import { setNewTodo } from '@features/todo-list/helpers/set-new-todo.ts';
import { updateExistingTodo } from '@features/todo-list/helpers/update-existing-todo.ts';
import { updateTodos } from '@features/todo-list/helpers/update-todos.ts';
import type { extendedTodoProps } from '@features/todo-list/types/index.ts';

export function processTodos(props: extendedTodoProps): void {
    const { elementsMap, currentTodos, newTodos, ul } = props;

    props.newTodos.forEach((todo) => {
        const existingLi: HTMLLIElement = props.elementsMap.get(todo.id);

        if (existingLi) {
            updateExistingTodo({ existingLi, currentTodos, todo });
        } else {
            setNewTodo({ elementsMap, todo });
        }

        updateTodos({ elementsMap, currentTodos, newTodos, ul });
    });
}
