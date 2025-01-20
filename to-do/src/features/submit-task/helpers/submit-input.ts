import { stateManager } from '@state/index.ts';

export function submitInput(task: string): void {
    stateManager.addTodo(task);
}
