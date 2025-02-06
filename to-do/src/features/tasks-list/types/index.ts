import type { Todo } from '@state/types/index.ts';

export type todoProps = {
    currentTodos: Todo[];
    newTodos: Todo[];
    elementsMap: Map<string, HTMLLIElement>;
};
