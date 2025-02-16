import type { AppState, Todo } from '@state/types/index.ts';

class StateManager {
    private state: AppState;
    private subscribers: (() => void)[] = [];

    constructor(initialState: AppState) {
        const savedState = localStorage.getItem('tasksList');
        this.state = savedState ? JSON.parse(savedState) : initialState;
    }

    subscribe(callback: () => void): void {
        this.subscribers.push(callback);
    }

    private notifySubscribers(): void {
        this.subscribers.forEach((callback) => callback());
    }

    private saveState(): void {
        localStorage.setItem('tasksList', JSON.stringify(this.state));
    }

    getState(): AppState {
        return this.state;
    }

    setSelectedDate(date: Date): void {
        const dateKey = date.toISOString().split('T')[0];
        this.state.selectedDate = dateKey;

        this.saveState();
        this.notifySubscribers();
    }

    addTodo(text: string): void {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };

        const dateKey = this.state.selectedDate;
        if (!this.state.todosByDate[dateKey]) {
            this.state.todosByDate[dateKey] = [];
        }

        this.state.todosByDate[dateKey].push(newTodo);
        this.saveState();
        this.notifySubscribers();
    }

    toggleTodo(id: string): void {
        const dateKey = this.state.selectedDate;
        const todos = this.state.todosByDate[dateKey] || [];
        const todo = todos.find((t) => t.id === id);

        if (todo) {
            todo.completed = !todo.completed;
            this.saveState();
            this.notifySubscribers();
        }
    }

    deleteTodo(id: string): void {
        this.state.todos = this.state.todos.filter((todo) => todo.id != id);
        this.saveState();
        this.notifySubscribers();
    }
}

const initialState: AppState = {
    todos: [],
};

export const stateManager = new StateManager(initialState);
