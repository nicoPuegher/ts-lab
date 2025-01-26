import type { AppState, Todo } from '@state/types/index.ts';

class StateManager {
    private state: AppState;
    private subscribers: (() => void)[] = [];

    constructor(initialState: AppState) {
        this.state = initialState;
    }

    subscribe(callback: () => void): void {
        this.subscribers.push(callback);
    }

    private notifySubscribers(): void {
        this.subscribers.forEach((callback) => callback());
    }

    getState(): AppState {
        return this.state;
    }

    addTodo(text: string): void {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };

        this.state.todos.push(newTodo);
        this.notifySubscribers();
    }

    toggleTodo(id: string): void {
        const todo = this.state.todos.find((todo) => todo.id == id);

        todo.completed = !todo.completed;
    }

    deleteTodo(id: string): void {
        this.state.todos = this.state.todos.filter((todo) => todo.id != id);
        this.notifySubscribers();
    }
}

const initialState: AppState = {
    todos: [],
};

export const stateManager = new StateManager(initialState);
