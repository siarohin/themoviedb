import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, ScheduleActions, getFilmsToWatch } from '../store/index';

@Injectable()
export class ScheduleStoreService {
    constructor(private store: Store<AppState>) {}

    /**
     * Select filmsToWatch from store
     */
    public filmsToWatch$ = this.store.select(getFilmsToWatch);

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
    public deleteFilmToWatch(film) {
        this.store.dispatch(new ScheduleActions.DeleteFilmToWatch(film));
    }
}
