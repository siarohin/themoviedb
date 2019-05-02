import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import {
    Film,
    ScheduleStoreService,
    WatchedListStoreService
} from '../../core/index';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    private ScheduleStoreService: ScheduleStoreService;
    private WatchedListStoreService: WatchedListStoreService;

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

    constructor(
        ScheduleStoreService: ScheduleStoreService,
        WatchedListStoreService: WatchedListStoreService
    ) {
        this.ScheduleStoreService = ScheduleStoreService;
        this.WatchedListStoreService = WatchedListStoreService;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.ScheduleStoreService.filmsToWatch$;
        this.watchedFilms$ = this.WatchedListStoreService.watchedFilms$;
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public checkBoxChange($event, film) {
        $event.checked
            ? this.WatchedListStoreService.createWatchedFilm(film)
            : this.WatchedListStoreService.deleteWatchedFilm(film);
    }
}
