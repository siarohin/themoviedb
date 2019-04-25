import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import {
    AppState,
    ScheduleState,
    getFilmsToWatch
} from '../../core/store/index';

import { Observable } from 'rxjs';
import { Film } from 'src/app/core';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    private store: Store<AppState>;

    public scheduleState$: Observable<ScheduleState>;
    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.store.pipe(select(getFilmsToWatch));
    }
}
