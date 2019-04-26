import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, getFilmsToWatch } from '../../core/index';

import { Observable } from 'rxjs';
import { Film } from 'src/app/core/index';

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

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.store.select(getFilmsToWatch);
    }
}
