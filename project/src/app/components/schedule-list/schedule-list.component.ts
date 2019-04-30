import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
    AppState,
    getFilmsToWatch,
    getWatchedFilms,
    Film,
    WatchedListActions
} from '../../core/index';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    private store: Store<AppState>;

    /**
     * selector,
     * 'filmsToWatch' from state
     */
    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    /**
     * selector,
     * 'getWatchedFilms' from state
     */
    public watchedFilms$: Observable<ReadonlyArray<Film>>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    public ngOnInit(): void {
        // add films to store from localStorage
        this.store.dispatch(new WatchedListActions.GetWatchedFilms([]));
        this.filmsToWatch$ = this.store.select(getFilmsToWatch);
        this.watchedFilms$ = this.store.select(getWatchedFilms);
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public checkBoxChange($event, film) {
        $event.checked
            ? this.store.dispatch(
                  new WatchedListActions.CreateWatchedFilm(film)
              )
            : this.store.dispatch(
                  new WatchedListActions.DeleteWatchedFilm(film)
              );
    }
}
