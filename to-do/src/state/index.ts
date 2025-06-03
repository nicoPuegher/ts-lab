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
        const { selectedDate } = this.state;
        const newDate = date.toISOString().split('T')[0];

        if (selectedDate == newDate) return;

        this.state = {
            ...this.state,
            selectedDate: newDate,
        };
        this.saveState();
        this.notifyStateChangeSubscribers();
    }

    setFilter(filter: Filter) {
        const { currentFilter } = this.state;

        if (currentFilter == filter) return;

        this.state = {
            ...this.state,
            currentFilter: filter,
        };
        this.notifyStateChangeSubscribers();
    }

    setSearchTerm(term: string) {
        const { searchTerm } = this.state;

        if (searchTerm == term) return;

        this.state = {
            ...this.state,
            searchTerm: term,
        };
        this.notifyStateChangeSubscribers();
    }

    addTodo(text: string) {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };

        const { selectedDate, todosByDate } = this.state;
        const currentTodosByDate = todosByDate[selectedDate] || [];

        this.state = {
            ...this.state,
            todosByDate: {
                ...this.state.todosByDate,
                [selectedDate]: [...currentTodosByDate, newTodo],
            },
        };
        this.saveState();
        this.notifyStateChangeSubscribers(newTodo);
    }

    toggleTodo(id: string) {
        const { selectedDate, todosByDate } = this.state;
        const currentTodosByDate = todosByDate[selectedDate] || [];

        this.state = {
            ...this.state,
            todosByDate: {
                ...this.state.todosByDate,
                [selectedDate]: currentTodosByDate.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
            },
        };
        this.saveState();
    }

    deleteTodo(id: string) {
        const { selectedDate, todosByDate } = this.state;
        const currentTodosByDate = todosByDate[selectedDate] || [];

        this.state = {
            ...this.state,
            todosByDate: {
                ...this.state.todosByDate,
                [selectedDate]: currentTodosByDate.filter((t) => t.id !== id),
            },
        };
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
