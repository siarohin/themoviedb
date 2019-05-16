import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as ScheduleActions from './schedule.actions';

@Injectable()
export class ScheduleEffects {
    private localStorageKey = 'schedule';
    private actions$: Actions;

    /**
     * Get filmsToWatch array from localStorage on init App,
     * Effect
     */
    @Effect()
    public getFilms$: Actions;

    /**
     * Add filmToWatch to localStorage,
     * Effect
     */
    @Effect()
    public createFilm$: Actions;

    /**
     * Delete filmToWatch from localStorage,
     * Effect
     */
    @Effect()
    public deleteFilm$: Actions;

    constructor(actions$: Actions) {
        this.actions$ = actions$;

        /**
         * Get filmsToWatch array from localStorage on init App,
         * Effect
         */
        this.getFilms$ = this.actions$.pipe(
            ofType<ScheduleActions.GetFilmsToWatch>(
                ScheduleActions.ScheduleActionTypes.GET_FILMS
            ),
            map(() => this.getFilmsToWatch()),
            catchError(err => of(new ScheduleActions.GetFilmsToWatchError(err)))
        );

        /**
         * Add filmToWatch to localStorage
         */
        this.createFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.CreateFilmToWatch>(
                ScheduleActions.ScheduleActionTypes.CREATE_FILM
            ),
            map(action => this.createFilmsToWatch(action)),
            catchError(err =>
                of(new ScheduleActions.CreateFilmToWatchError(err))
            )
        );

        /**
         * Delete filmToWatch from localStorage
         */
        this.deleteFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.DeleteFilmToWatch>(
                ScheduleActions.ScheduleActionTypes.DELETE_FILM
            ),
            map(action => this.deleteFilmToWatch(action)),
            catchError(err =>
                of(new ScheduleActions.DeleteFilmToWatchError(err))
            )
        );
    }

    /**
     * Get filmsToWatch
     */
    private getFilmsToWatch() {
        const films = JSON.parse(
            localStorage.getItem(this.localStorageKey) || '[]'
        );
        return new ScheduleActions.GetFilmsToWatchSuccess(films);
    }

    /**
     * Add filmToWatch
     */
    private createFilmsToWatch(action) {
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
            return new ScheduleActions.CreateFilmToWatchSuccess(action.payload);
        }
        return new ScheduleActions.CreateFilmToWatchError(action.payload);
    }

    /**
     * Delete filmToWatch
     */
    private deleteFilmToWatch(action) {
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
            return new ScheduleActions.DeleteFilmToWatchSuccess(newFilmsArray);
        }
        return new ScheduleActions.DeleteFilmToWatchError(action.payload);
    }
}
