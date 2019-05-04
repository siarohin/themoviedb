import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { publishReplay, refCount, map, debounceTime } from 'rxjs/operators';

import {
    FilmService,
    Film,
    ChangeBox,
    ScheduleStoreService
} from '../../core/index';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
    private scheduleStoreService: ScheduleStoreService;

    /**
     * add service
     */
    private filmService: FilmService;

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

    constructor(
        filmService: FilmService,
        scheduleStoreService: ScheduleStoreService
    ) {
        this.filmService = filmService;
        this.scheduleStoreService = scheduleStoreService;
    }

    public ngOnInit(): void {
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
    public onCheckBoxChange($event: ChangeBox) {
        const { event, film } = $event;
        event.checked
            ? this.scheduleStoreService.createFilmToWatch(film)
            : this.scheduleStoreService.deleteFilmToWatch(film);
    }
}
