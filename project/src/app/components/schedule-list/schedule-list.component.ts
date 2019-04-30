import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Film, ScheduleFacade, WatchedListFacade } from '../../core/index';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    private scheduleFacade: ScheduleFacade;
    private watchedListFacade: WatchedListFacade;

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
        scheduleFacade: ScheduleFacade,
        watchedListFacade: WatchedListFacade
    ) {
        this.scheduleFacade = scheduleFacade;
        this.watchedListFacade = watchedListFacade;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.scheduleFacade.filmsToWatch$;
        this.watchedFilms$ = this.watchedListFacade.watchedFilms$;
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public checkBoxChange($event, film) {
        $event.checked
            ? this.watchedListFacade.createWatchedFilm(film)
            : this.watchedListFacade.deleteWatchedFilm(film);
    }
}
