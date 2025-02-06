import type { Todo } from '@state/types/index.ts';

export type todoProps = {
    elementsMap: Map<string, HTMLLIElement>;
    currentTodos: Todo[];
    newTodos: Todo[];
};

export type newTodoProps = {
    elementsMap: Map<string, HTMLLIElement>;
    todo: Todo;
};

export type extendedTodoProps = todoProps & {
    ul: HTMLUListElement;
};

export type updateExistingTodoProps = {
    existingLi: HTMLLIElement;
    currentTodos: Todo[];
    todo: Todo;
};
