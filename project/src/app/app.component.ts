import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';
import { noop, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    inputFocusActive = false;
    selectedFilm?: FilmInterface;
    filmList?: FilmInterface[];
    title = 'Movie';
    subscriptionOnFilmList: Subscription;
    value: string;

    constructor(private filmService: FilmService) {}

    onInputFocus(): void {
        this.inputFocusActive = true;
    }

    onInputBlur(): void {
        this.inputFocusActive = false;
    }

    onInputChange(value: string) {
        this.filmService.resetCount();
        if (value && value.length > 2) {
            let newRequest = false;
            this.value === value ? (newRequest = false) : (newRequest = true);
            this.value = value;
            this.subscriptionOnFilmList = this.filmService
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
                );
        }
    }

    onButtonFilmClick($event: MouseEvent): void {
        this.filmService.incrementCount();
        const count = this.filmService.getCount();
        count < 20 ? this.getExistFilms() : this.getNewFilms();
    }

    onFilmListClick($event: MouseEvent): void {
        const { id } = $event.currentTarget as HTMLInputElement;
        const activeFilm = this.filmList.find(
            film => film.id.toString() === id
        );
        if (activeFilm) {
            this.getSelectedFilm(activeFilm);
        }
    }

    getExistFilms() {
        this.subscriptionOnFilmList = this.filmService
            .getPartialFilmList()
            .subscribe(
                stream => {
                    this.filmList = [...this.filmList, ...stream];
                    this.getSelectedFilm(this.filmList[0]);
                },
                noop,
                this.subscriptionOnFilmList
                    ? () => this.subscriptionOnFilmList.unsubscribe()
                    : noop
            );
    }

    getNewFilms() {
        this.filmService.incrementPage();
        this.onInputChange(this.value);
    }

    getSelectedFilm(film) {
        return (this.selectedFilm = film);
    }
}
