import { Component, OnInit, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
    ScheduleStoreService,
    WatchedListStoreService,
    Film
} from './core/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent implements OnInit {
    private scheduleStoreService: ScheduleStoreService;
    private watchedListStoreService: WatchedListStoreService;

    /**
     * get film to watch,
     * use for render counter in tpl
     */
    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    constructor(
        scheduleStoreService: ScheduleStoreService,
        watchedListStoreService: WatchedListStoreService
    ) {
        this.scheduleStoreService = scheduleStoreService;
        this.watchedListStoreService = watchedListStoreService;
    }

    public ngOnInit(): void {
        this.scheduleStoreService.getInitialState();
        this.watchedListStoreService.getInitialState();
        this.filmsToWatch$ = this.scheduleStoreService.getFilmsToWatch();
    }
}
