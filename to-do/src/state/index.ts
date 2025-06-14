import type { AppChangeSubscribers, AppState, Filter, Todo } from '@state/types/index.ts';

export const STORAGE_KEY = 'todoData';

class StateManager {
    private state: AppState;
    private stateChangeSubscribers: AppChangeSubscribers;

    constructor() {
        const initialState = generateInitialState();

        const storedState = localStorage.getItem(STORAGE_KEY);

        try {
            if (storedState) {
                const previousState: AppState = JSON.parse(storedState);
                initialState.todosByDate = previousState.todosByDate;
            }
        } catch (error) {
            console.error('Failed to parse stored state', error);
            localStorage.removeItem(STORAGE_KEY);
        }

        this.state = initialState;
        this.stateChangeSubscribers = [];
    }

    getState() {
        return this.state;
    }

    setSelectedDate(date: Date) {
        const { selectedDate } = this.state;
        const newDate = formatDateForStorage(date);

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
        this.updateTodos((todos) =>
            todos.map((todo) => (todo.id == id ? { ...todo, completed: !todo.completed } : todo)),
        );
    }

    deleteTodo(id: string) {
        this.updateTodos((todos) => todos.filter((todo) => todo.id !== id));
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

    private updateTodos(callback: (todos: Todo[]) => Todo[]) {
        const { selectedDate, todosByDate } = this.state;
        const currentTodos = todosByDate[selectedDate] || [];

        this.state = {
            ...this.state,
            todosByDate: {
                ...todosByDate,
                [selectedDate]: callback(currentTodos),
            },
        };
        this.saveState();
    }
}

function generateInitialState(): AppState {
    return {
        selectedDate: generateCurrentDate(),
        todosByDate: {},
        currentFilter: 'all',
        searchTerm: '',
    };
}

function generateCurrentDate() {
    return formatDateForStorage(new Date());
}

function formatDateForStorage(date: Date) {
    return date.toISOString().split('T')[0];
}

export const stateManager = new StateManager();
