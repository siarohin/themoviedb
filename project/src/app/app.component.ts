import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
    AppState,
    ScheduleActions,
    WatchedListActions,
    getFilmsToWatch,
    Film
} from './core/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private store: Store<AppState>;

    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.store.select(getFilmsToWatch);

        // add films to store from localStorage
        this.store.dispatch(new ScheduleActions.GetFilmsToWatch([]));
        this.store.dispatch(new WatchedListActions.GetWatchedFilms([]));
    }
}
