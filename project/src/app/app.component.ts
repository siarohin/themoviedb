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
    private ScheduleStoreService: ScheduleStoreService;
    private WatchedListStoreService: WatchedListStoreService;

    /**
     * get film to watch,
     * use for render counter in tpl
     */
    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    constructor(
        ScheduleStoreService: ScheduleStoreService,
        WatchedListStoreService: WatchedListStoreService
    ) {
        this.ScheduleStoreService = ScheduleStoreService;
        this.WatchedListStoreService = WatchedListStoreService;
    }

    public ngOnInit(): void {
        this.ScheduleStoreService.getInitialState();
        this.WatchedListStoreService.getInitialState();
        this.filmsToWatch$ = this.ScheduleStoreService.getFilmsToWatch();
    }
}
