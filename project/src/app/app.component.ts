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

    public inputFocusActive = false;
    public selectedFilm?: FilmInterface;
    public filmList?: FilmInterface[];
    public title = 'Movie';

    constructor(filmService: FilmService) {
        this.filmService = filmService;
    }

    public onInputFocus(): void {
        this.inputFocusActive = true;
    }

    public onInputBlur(): void {
        this.inputFocusActive = false;
    }

    public onInputChange(value?: string) {
        if (value && value.length > 2) {
            this.getFilm(value);
        }
    }

    public onButtonFilmClick(): void {
        const value = this.filmService.getValue();
        this.getFilm(value);
    }

    public onFilmListClick($event: MouseEvent): void {
        const { id } = $event.currentTarget as HTMLInputElement;
        const activeFilm = this.filmList.find(
            film => film.id.toString() === id
        );
        if (activeFilm) {
            this.getSelectedFilm(activeFilm);
        }
    }

    public getFilm(value?: string) {
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
                noop,
                this.subscriptionOnFilmList
                    ? () => this.subscriptionOnFilmList.unsubscribe()
                    : noop
            ));
    }

    public getSelectedFilm(film) {
        return (this.selectedFilm = film);
    }
}
