import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';
import { noop, Subscription, from } from 'rxjs';

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

    constructor(private filmService: FilmService) {}

    onInputFocus(): void {
        this.inputFocusActive = true;
    }

    onInputBlur(): void {
        this.inputFocusActive = false;
    }

    onInputChange(value?: string) {
        if (value && value.length > 2) {
            let newRequest = this.filmService.isNewRequest(value);
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
        const value = this.filmService.getValue();
        this.onInputChange(value);
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

    getSelectedFilm(film) {
        return (this.selectedFilm = film);
    }
}
