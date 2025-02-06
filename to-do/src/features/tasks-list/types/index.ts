import type { Todo } from '@state/types/index.ts';

export type todoProps = {
    elementsMap: Map<string, HTMLLIElement>;
    currentTodos: Todo[];
    newTodos: Todo[];
};
