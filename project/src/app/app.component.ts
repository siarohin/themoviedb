import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';
import { publishReplay, refCount, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private filmService: FilmService;

    /**
     * observable filmList from service
     */
    public filmsList$: Observable<Array<FilmInterface>>;

    /**
     * param (true | false) for <header /> and <app-custom-form />
     * change classList (active | not)
     */
    public inputFocusActive = false;

    /**
     * param with film`s details for <app-film-detail />
     * change description for selected film
     */
    public selectedFilm?: FilmInterface;

    /**
     * param with film`s array which have got from service
     * include from 5 to 20 films
     */

    /**
     * observable film by click event from <li />
     */
    public activeFilm$: Observable<FilmInterface>;

    /**
     * param {{ title }} uses in template into <header />
     */
    public title = 'Movie';

    constructor(filmService: FilmService) {
        this.filmService = filmService;
    }

    public ngOnInit(): void {
        this.filmsList$ = this.filmService.getFilmList().pipe(
            publishReplay(1),
            refCount()
        );

        this.activeFilm$ = this.filmsList$.pipe(map(films => films[0]));
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
    public onFilmListClick($event: MouseEvent): void {
        const { id } = $event.currentTarget as HTMLInputElement;
        this.activeFilm$ = this.filmsList$.pipe(
            map(films => films.find(film => film.id.toString() === id))
        );
    }
}
