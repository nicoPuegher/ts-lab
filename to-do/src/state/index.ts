import type { AppState, Todo } from '@state/types/index.ts';

class StateManager {
    private state: AppState;

    constructor(initialState: AppState) {
        this.state = initialState;
    }

    getState(): AppState {
        return this.state;
    }

    addTodo(text: string): void {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
        };

        this.state.todos.push(newTodo);
    }
}
