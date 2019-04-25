import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { publishReplay, refCount, map, debounceTime } from 'rxjs/operators';

import { FilmService, Film, Change } from '../../core/index';

import { Store, select } from '@ngrx/store';
import {
    AppState,
    ScheduleState,
    getFilmsToWatch
} from '../../core/store/index';

import * as ScheduleActions from '../../core/store/schedule/schedule.actions';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
    /**
     * add store
     */
    private store: Store<AppState>;

    /**
     * add service
     */
    private filmService: FilmService;

    /**
     * state
     */
    public scheduleList$: Observable<ScheduleState>;

    /**
     * state data
     */
    public filmsToWatch$: Observable<ReadonlyArray<Film>>;

    /**
     * observable filmList from service
     */
    public filmsList$: Observable<Array<Film>>;

    /**
     * param (true | false) for <header /> and <app-custom-form />
     * change classList (active | not)
     */
    public inputFocusActive = false;

    /**
     * observable film by click event from <li />
     */
    public activeFilm$: Observable<Film>;

    /**
     * param {{ title }} uses in template into <header />
     */
    public title = 'Movie';

    constructor(filmService: FilmService, store: Store<AppState>) {
        this.filmService = filmService;
        this.store = store;
    }

    public ngOnInit(): void {
        this.filmsToWatch$ = this.store.pipe(select(getFilmsToWatch));
        this.filmsList$ = this.filmService.getFilmList().pipe(
            publishReplay(1),
            refCount()
        );
    }

    /**
     * input controller from <app-film-detail />
     * binding input`s focus (on)
     * method change this.focus param to true
     */
    public onInputFocus(): void {
        this.inputFocusActive = true;
    }

    /**
     * input controller from <app-film-detail />
     * binding input`s focus (off)
     * method change this.focus param to false
     */
    public onInputBlur(): void {
        this.inputFocusActive = false;
    }

    /**
     * input controller from <app-film-detail />
     * binding input`s value Onchange
     * method send value to service
     */
    public onInputChange(value?: string): void {
        if (value && value.length > 2) {
            this.filmService.setQuery(value);
            this.activeFilm$ = this.filmsList$.pipe(
                debounceTime(500),
                map(films => films[0])
            );
        }
    }

    /**
     * button controller from <app-film-list />
     * binding button`s event OnClick
     * method call service with new or existing value
     */
    public onButtonFilmClick(): void {
        this.filmService.setPage();
    }

    /**
     * filmList controller from <app-film-list />
     * binding film`s event OnClick
     * method add 'active' class to selected film
     */
    public onFilmListClick(film): void {
        this.activeFilm$ = of(film);
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public onCheckBoxChange($event: Change) {
        const { event, film } = $event;
        event.checked
            ? this.store.dispatch(new ScheduleActions.CreateFilm(film))
            : this.store.dispatch(new ScheduleActions.DeleteFilm(film));
    }
}
