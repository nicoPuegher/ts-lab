import type { AppState } from '@state/types/index.ts';

class StateManager {
    private state: AppState;

    constructor(initialState: AppState) {
        this.state = initialState;
    }
}
