import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as ScheduleActions from './schedule.actions';

@Injectable()
export class ScheduleEffects {
    private localStorageKey = 'schedule';

    private actions$: Actions;

    @Effect()
    public getFilms$: Actions;

    @Effect()
    public createFilm$: Actions;

    @Effect()
    public deleteFilm$: Actions;

    constructor(actions$: Actions) {
        this.actions$ = actions$;

        this.getFilms$ = this.actions$.pipe(
            ofType<ScheduleActions.GetFilmsToWatch>(
                ScheduleActions.ScheduleActionTypes.GET_FILMS
            ),
            map(() => {
                const films = JSON.parse(
                    localStorage.getItem(this.localStorageKey) || '[]'
                );
                return new ScheduleActions.GetFilmsToWatchSuccess(films);
            }),
            catchError(err => of(new ScheduleActions.GetFilmsToWatchError(err)))
        );

        this.createFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.CreateFilmToWatch>(
                ScheduleActions.ScheduleActionTypes.CREATE_FILM
            ),
            map(action => {
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
                    return new ScheduleActions.CreateFilmToWatchSuccess(
                        action.payload
                    );
                }
                return new ScheduleActions.CreateFilmToWatchError(
                    action.payload
                );
            }),
            catchError(err =>
                of(new ScheduleActions.CreateFilmToWatchError(err))
            )
        );

        this.deleteFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.DeleteFilmToWatch>(
                ScheduleActions.ScheduleActionTypes.DELETE_FILM
            ),
            map(action => {
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
                    return new ScheduleActions.DeleteFilmToWatchSuccess(
                        newFilmsArray
                    );
                }
                return new ScheduleActions.DeleteFilmToWatchError(
                    action.payload
                );
            }),
            catchError(err =>
                of(new ScheduleActions.DeleteFilmToWatchError(err))
            )
        );
    }
}
