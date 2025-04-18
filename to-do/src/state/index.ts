import type { AppState, Todo } from '@state/types/index.ts';

class StateManager {
    private state: AppState;
    private stateChangeSubscribers: ((newTodo?: Todo) => void)[] = [];

    constructor() {
        const initialState: AppState = {
            selectedDate: new Date().toISOString().split('T')[0],
            todosByDate: {},
            currentFilter: 'all',
            searchTerm: '',
        };

        const storedState = localStorage.getItem('tasksList');

        if (storedState) {
            const previousState: AppState = JSON.parse(storedState);
            initialState.todosByDate = previousState.todosByDate;
        }

        this.state = initialState;
    }

    subscribeStateChange(callback: (newTodo?: Todo) => void): void {
        this.stateChangeSubscribers.push(callback);
    }

    private notifyStateChangeSubscribers(newTodo?: Todo): void {
        this.stateChangeSubscribers.forEach((callback) => callback(newTodo));
    }

    private saveState(): void {
        localStorage.setItem('tasksList', JSON.stringify(this.state));
    }

    getState(): AppState {
        return this.state;
    }

    setSelectedDate(date: Date): void {
        const dateKey = date.toISOString().split('T')[0];

        if (this.state.selectedDate == dateKey) return;

        this.state.selectedDate = dateKey;
        this.saveState();
        this.notifyStateChangeSubscribers();
    }

    setFilter(filter: string): void {
        if (this.state.currentFilter == filter) return;

        this.state.currentFilter = filter;
        this.notifyStateChangeSubscribers();
    }

    setSearchTerm(term: string): void {
        if (this.state.searchTerm == term) return;

        this.state.searchTerm = term;
        this.notifyStateChangeSubscribers();
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
        this.notifyStateChangeSubscribers(newTodo);
    }

    toggleTodo(id: string): void {
        const dateKey = this.state.selectedDate;
        const todos = this.state.todosByDate[dateKey] || [];
        const todo = todos.find((t) => t.id === id);

        if (todo) {
            todo.completed = !todo.completed;
            this.saveState();
        }
    }

    deleteTodo(id: string): void {
        const dateKey = this.state.selectedDate;
        const todos = this.state.todosByDate[dateKey] || [];

        this.state.todosByDate[dateKey] = todos.filter((t) => t.id !== id);
        this.saveState();
    }
}

export const stateManager = new StateManager();
