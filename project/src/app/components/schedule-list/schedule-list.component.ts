import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, getFilmsToWatch, getWatchedFilms } from '../../core/index';

import { Observable } from 'rxjs';
import { Film } from 'src/app/core/index';
import * as WatchedListActions from '../../core/store/watched-list/watched-list.actions';

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
