import type { AppState, Todo } from '@state/types/index.ts';

class StateManager {
    private state: AppState;

    constructor() {
        const initialState: AppState = {
            selectedDate: new Date().toISOString().split('T')[0],
            todosByDate: {},
            currentFilter: 'all',
        };

        const storedState = localStorage.getItem('tasksList');

        if (storedState) {
            const previousState: AppState = JSON.parse(storedState);
            initialState.todosByDate = previousState.todosByDate;
        }

        this.state = initialState;
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

    setFilter(filter: string): void {
        this.state.currentFilter = filter;

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
        const dateKey = this.state.selectedDate;
        const todos = this.state.todosByDate[dateKey] || [];
        this.state.todosByDate[dateKey] = todos.filter((t) => t.id !== id);

        this.saveState();
        this.notifySubscribers();
    }
}

export const stateManager = new StateManager();
