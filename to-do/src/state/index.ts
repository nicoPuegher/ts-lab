import type { AppChangeSubscribers, AppState, Filter, Todo } from '@state/types/index.ts';

const STORAGE_KEY = 'taskData';

class StateManager {
    private state: AppState;
    private stateChangeSubscribers: AppChangeSubscribers;

    constructor() {
        const initialState = generateInitialState();

        const storedState = localStorage.getItem(STORAGE_KEY);

        if (storedState) {
            const previousState: AppState = JSON.parse(storedState);
            initialState.todosByDate = previousState.todosByDate;
        }

        this.state = initialState;
        this.stateChangeSubscribers = [];
    }

    subscribeStateChange(callback: (newTodo?: Todo) => void) {
        this.stateChangeSubscribers.push(callback);
    }

    private notifyStateChangeSubscribers(newTodo?: Todo) {
        this.stateChangeSubscribers.forEach((callback) => callback(newTodo));
    }

    private saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    }

    getState() {
        return this.state;
    }

    setSelectedDate(date: Date) {
        const dateKey = date.toISOString().split('T')[0];

        if (this.state.selectedDate == dateKey) return;

        this.state = {
            ...this.state,
            selectedDate: dateKey,
        };
        this.saveState();
        this.notifyStateChangeSubscribers();
    }

    setFilter(filter: Filter) {
        if (this.state.currentFilter == filter) return;

        this.state = {
            ...this.state,
            currentFilter: filter,
        };
        this.notifyStateChangeSubscribers();
    }

    setSearchTerm(term: string) {
        if (this.state.searchTerm == term) return;

        this.state.searchTerm = term;
        this.notifyStateChangeSubscribers();
    }

    addTodo(text: string) {
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

    toggleTodo(id: string) {
        const dateKey = this.state.selectedDate;
        const todos = this.state.todosByDate[dateKey] || [];
        const todo = todos.find((t) => t.id === id);

        if (todo) {
            todo.completed = !todo.completed;
            this.saveState();
        }
    }

    deleteTodo(id: string) {
        const dateKey = this.state.selectedDate;
        const todos = this.state.todosByDate[dateKey] || [];

        if (todos.length == 1) {
            delete this.state.todosByDate[dateKey];
            this.saveState();
            return;
        }

        this.state.todosByDate[dateKey] = todos.filter((t) => t.id !== id);
        this.saveState();
    }
}

function generateCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function generateInitialState(): AppState {
    return {
        selectedDate: generateCurrentDate(),
        todosByDate: {},
        currentFilter: 'all',
        searchTerm: '',
    };
}

export const stateManager = new StateManager();
