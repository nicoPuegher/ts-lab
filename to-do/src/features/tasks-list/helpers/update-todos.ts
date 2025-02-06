import type { extendedTodoProps } from '@features/tasks-list/types/index.ts';

export function updateTodos(props: extendedTodoProps): void {
    const fragment: DocumentFragment = document.createDocumentFragment();

    props.newTodos.forEach((todo) => {
        const li: HTMLLIElement = props.elementsMap.get(todo.id);
        if (li) fragment.appendChild(li);
    });

    props.ul.replaceChildren(fragment);

    props.currentTodos = [...props.newTodos];
}
