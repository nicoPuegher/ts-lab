export type AppState = {
    selectedDate: string;
    selectedFilter: Filter;
    searchTerm: string;
    todosByDate: {
        [date: string]: Todo[];
    };
};

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

export type Filter = 'all' | 'active' | 'completed';

export type AppChangeSubscribers = ((newTodo?: Todo) => void)[];
