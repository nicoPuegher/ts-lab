export type AppState = {
    selectedDate: string;
    todosByDate: {
        [date: string]: Todo[];
    };
    currentFilter: Filter;
    searchTerm: string;
};

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

export type Filter = 'all' | 'active' | 'completed';

export type AppChangeSubscribers = ((newTodo?: Todo) => void)[];
