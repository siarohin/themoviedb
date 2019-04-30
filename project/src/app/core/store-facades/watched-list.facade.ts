import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, WatchedListActions, getWatchedFilms } from '../store/index';

@Injectable()
export class WatchedListFacade {
    constructor(private store: Store<AppState>) {}

    public watchedFilms$ = this.store.select(getWatchedFilms);

    /**
     * add films to store from localStorage onInit
     */
    public getInitialState() {
        this.store.dispatch(new WatchedListActions.GetWatchedFilms([]));
    }

    /**
     * add watchedFilm to store
     */
    public createWatchedFilm(film) {
        this.store.dispatch(new WatchedListActions.CreateWatchedFilm(film));
    }

    /**
     * delete watchedFilm from store
     */
    public deleteWatchedFilm(film) {
        this.store.dispatch(new WatchedListActions.DeleteWatchedFilm(film));
    }
}
