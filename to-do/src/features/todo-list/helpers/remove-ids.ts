import type { todoProps } from '@features/todo-list/types/index.ts';

export function removeIds(props: todoProps): void {
    const currentIds = new Set<string>(props.currentTodos.map((currentTodo) => currentTodo.id));
    const newIds = new Set<string>(props.newTodos.map((newTodo) => newTodo.id));

    const idsToRemove: string[] = Array.from(currentIds).filter((id) => !newIds.has(id));

    idsToRemove.forEach((id) => {
        const li: HTMLLIElement = props.elementsMap.get(id);
        if (li) {
            li.remove();
            props.elementsMap.delete(id);
        }
    });
}
