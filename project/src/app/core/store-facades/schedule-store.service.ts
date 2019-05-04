import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, ScheduleActions, getFilmsToWatch } from '../store/index';

@Injectable()
export class ScheduleStoreService {
    private store: Store<AppState>;
    private filmsToWatch$;

    constructor(store: Store<AppState>) {
        this.store = store;
        this.filmsToWatch$ = this.store.select(getFilmsToWatch);
    }

    /**
     * select filmsToWatch from store
     */
    public getFilmsToWatch() {
        return this.filmsToWatch$;
    }

    /**
     * add films to store from localStorage onInit
     */
    public getInitialState() {
        this.store.dispatch(new ScheduleActions.GetFilmsToWatch([]));
    }

    /**
     * add film to watchList from store
     */
    public createFilmToWatch(film) {
        this.store.dispatch(new ScheduleActions.CreateFilmToWatch(film));
    }

    /**
     * delete film to watchList from store
     */
    public deleteFilmToWatch(film): void {
        this.store.dispatch(new ScheduleActions.DeleteFilmToWatch(film));
    }
}
