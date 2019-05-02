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
    private scheduleStoreService: ScheduleStoreService;
    private watchedListStoreService: WatchedListStoreService;

    /**
     * selector,
     * 'filmsToWatch' from state
     */
    public filmsToWatch$: Observable<Film>;

    /**
     * selector,
     * 'getWatchedFilms' from state
     */
    public watchedFilms$: Observable<ReadonlyArray<Film>>;

    constructor(
        scheduleStoreService: ScheduleStoreService,
        watchedListStoreService: WatchedListStoreService
    ) {
        this.scheduleStoreService = scheduleStoreService;
        this.watchedListStoreService = watchedListStoreService;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.scheduleStoreService.getFilmsToWatch();
        this.watchedFilms$ = this.watchedListStoreService.getWatchedFilms();
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public checkBoxChange($event, film) {
        $event.checked
            ? this.watchedListStoreService.createWatchedFilm(film)
            : this.watchedListStoreService.deleteWatchedFilm(film);
    }
}
