import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as WatchedListActions from './watched-list.actions';

@Injectable()
export class WatchedListEffects {
    private localStorageKey = 'watched';

    @Effect()
    public getFilms$: Actions;

    @Effect()
    public createFilm$: Actions;

    @Effect()
    public deleteFilm$: Actions;

    constructor(private actions$: Actions) {
        this.actions$ = actions$;

        /**
         * Get watchedFilms array from localStorage on init App
         */
        this.getFilms$ = this.actions$.pipe(
            ofType<WatchedListActions.GetWatchedFilms>(
                WatchedListActions.WatchedListActionTypes.GET_FILMS
            ),
            map(() => this.getWatchedFilms()),
            catchError(err =>
                of(new WatchedListActions.GetWatchedFilmsError(err))
            )
        );

        /**
         * Add watchedFilm to localStorage
         */
        this.createFilm$ = this.actions$.pipe(
            ofType<WatchedListActions.CreateWatchedFilm>(
                WatchedListActions.WatchedListActionTypes.CREATE_FILM
            ),
            map(action => this.createWatchedFilm(action)),
            catchError(err =>
                of(new WatchedListActions.CreateWatchedFilmError(err))
            )
        );

        /**
         * Delete watchedFilm from localStorage
         */
        this.deleteFilm$ = this.actions$.pipe(
            ofType<WatchedListActions.DeleteWatchedFilm>(
                WatchedListActions.WatchedListActionTypes.DELETE_FILM
            ),
            map(action => this.deleteWatchedFilm(action)),
            catchError(err =>
                of(new WatchedListActions.DeleteWatchedFilmError(err))
            )
        );
    }

    /**
     * Get watchedFilms
     */
    private getWatchedFilms() {
        const films = JSON.parse(
            localStorage.getItem(this.localStorageKey) || '[]'
        );
        return new WatchedListActions.GetWatchedFilmsSuccess(films);
    }

    /**
     * Add watchedFilm
     */
    private createWatchedFilm(action) {
        const uid = action.payload.id;
        const films = JSON.parse(
            localStorage.getItem(this.localStorageKey) || '[]'
        );
        const filmInStorage = films.find(film => film.id === uid);
        if (!filmInStorage) {
            localStorage.setItem(
                this.localStorageKey,
                JSON.stringify([...films, action.payload])
            );
            return new WatchedListActions.CreateWatchedFilmSuccess(
                action.payload
            );
        }
        return new WatchedListActions.CreateWatchedFilmError(action.payload);
    }

    /**
     * Delete watchedFilm
     */
    private deleteWatchedFilm(action) {
        const uid = action.payload.id;
        const films = JSON.parse(
            localStorage.getItem(this.localStorageKey) || '[]'
        );
        const newFilmsArray = films.filter(film => film.id !== uid);
        if (newFilmsArray) {
            localStorage.setItem(
                this.localStorageKey,
                JSON.stringify(newFilmsArray)
            );
            return new WatchedListActions.DeleteWatchedFilmSuccess(
                newFilmsArray
            );
        }
        return new WatchedListActions.DeleteWatchedFilmError(action.payload);
    }
}
