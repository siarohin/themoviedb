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
    public createFilm$: Actions;

    @Effect()
    deleteFilm$: Actions;

    constructor(actions$: Actions) {
        this.actions$ = actions$;

        this.createFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.CreateFilm>(
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
                }
                return new ScheduleActions.CreateFilmSuccess(action.payload);
            }),
            catchError(err => of(new ScheduleActions.CreateFilmError(err)))
        );

        this.deleteFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.DeleteFilm>(
                ScheduleActions.ScheduleActionTypes.DELETE_FILM
            ),
            map(action => {
                const uid = action.payload.id;
                const films = JSON.parse(
                    localStorage.getItem(this.localStorageKey) || '[]'
                );
                localStorage.setItem(
                    this.localStorageKey,
                    JSON.stringify(films.filter(film => film.id !== uid))
                );
                return new ScheduleActions.DeleteFilmSuccess(action.payload);
            }),
            catchError(err => of(new ScheduleActions.DeleteFilmError(err)))
        );
    }
}
