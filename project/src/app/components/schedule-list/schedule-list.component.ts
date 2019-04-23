import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState, ScheduleState } from '../../core/store/index';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    private store: Store<AppState>;

    public scheduleState$: Observable<ScheduleState>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    public ngOnInit(): void {
        this.scheduleState$ = this.store.pipe(select('schedule'));
    }
}
