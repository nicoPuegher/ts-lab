import { setNewTodo } from '@features/tasks-list/helpers/setNewTodo.ts';
import { updateExistingTodo } from '@features/tasks-list/helpers/update-existing-todo.ts';
import { updateTodos } from '@features/tasks-list/helpers/update-todos.ts';
import type { extendedTodoProps } from '@features/tasks-list/types';

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
