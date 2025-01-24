import type { AppState, Todo } from '@state/types/index.ts';

class StateManager {
    private state: AppState;
    private subscribers: (() => void)[] = [];

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

    toggleTodo(id: number): void {
        const todo = this.state.todos.find((todo) => todo.id == id);

        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    deleteTodo(id: number): void {
        this.state.todos = this.state.todos.filter((todo) => todo.id != id);
    }
}

const initialState: AppState = {
    todos: [],
};

export const stateManager = new StateManager(initialState);
