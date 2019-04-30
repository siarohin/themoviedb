import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, ScheduleActions, WatchedListActions } from './core/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private store: Store<AppState>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    public ngOnInit(): void {
        // add films to store from localStorage
        this.store.dispatch(new ScheduleActions.GetFilmsToWatch([]));
        this.store.dispatch(new WatchedListActions.GetWatchedFilms([]));
    }
}
