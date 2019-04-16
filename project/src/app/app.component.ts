import { Component } from '@angular/core';

import { noop, Subscription } from 'rxjs';

import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private filmService: FilmService;
    private subscriptionOnFilmList: Subscription;

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
    public filmList?: FilmInterface[];

    /**
     * param {{ title }} uses in template into <header />
     */
    public title = 'Movie';

    constructor(filmService: FilmService) {
        this.filmService = filmService;
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
    public onInputChange(value?: string) {
        if (value && value.length > 2) {
            this.getFilm(value);
        }
    }

    /**
     * button controller from <app-film-list />
     * binding button`s event OnClick
     * method call service with new or existing value
     */
    public onButtonFilmClick(): void {
        const value = this.filmService.getValue();
        this.getFilm(value);
    }

    /**
     * filmList controller from <app-film-list />
     * binding film`s event OnClick
     * method add 'active' class to selected film
     */
    public onFilmListClick($event: MouseEvent): void {
        const { id } = $event.currentTarget as HTMLInputElement;
        const activeFilm = this.filmList.find(
            film => film.id.toString() === id
        );
        if (activeFilm) {
            this.getSelectedFilm(activeFilm);
        }
    }

    /**
     * send request to service
     * method using by this.methods 'onButtonFilmClick' and  'onInputChange'
     * return subscription to film`s array, set this.filmList
     */
    public getFilm(value?: string) {
        // get newRequest (true | false) from service
        // if new value !== value, return new filmList
        // if new value === value, add films to existing filmList
        const newRequest: boolean = this.filmService.isNewRequest(value);
        return (this.subscriptionOnFilmList = this.filmService
            .getFilmList(value)
            .subscribe(
                stream => {
                    this.filmList && !newRequest
                        ? (this.filmList = [...this.filmList, ...stream])
                        : (this.filmList = stream);
                    this.getSelectedFilm(this.filmList[0]);
                },
                // error
                noop,
                // subscription complite --> unsubscribe
                this.subscriptionOnFilmList
                    ? () => this.subscriptionOnFilmList.unsubscribe()
                    : noop
            ));
    }

    /**
     * method using by this.methods 'onFilmListClick' and  'getFilm'
     * return selected film by 'click' event or first film from array
     * set param selectedFilm
     */
    public getSelectedFilm(film) {
        return (this.selectedFilm = film);
    }
}
