import { Component, OnInit, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ScheduleFacade, WatchedListFacade, Film } from './core/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent implements OnInit {
    private scheduleFacade: ScheduleFacade;
    private watchedListFacade: WatchedListFacade;

    /**
     * get film to watch,
     * use for render counter in tpl
     */
    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    constructor(
        scheduleFacade: ScheduleFacade,
        watchedListFacade: WatchedListFacade
    ) {
        this.scheduleFacade = scheduleFacade;
        this.watchedListFacade = watchedListFacade;
    }

    public ngOnInit(): void {
        this.scheduleFacade.getInitialState();
        this.watchedListFacade.getInitialState();
        this.filmsToWatch$ = this.scheduleFacade.filmsToWatch$;
    }
}
