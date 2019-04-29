import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { ScheduleActions } from './index';

@Injectable()
export class ScheduleEffects {
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
            tap(action => {
                const uid = action.payload.id;
                const films = JSON.parse(
                    localStorage.getItem('schedule') || '[]'
                );
                const filmInStorage = films.find(film => film.id === uid);

                if (!filmInStorage) {
                    localStorage.setItem(
                        'schedule',
                        JSON.stringify([...films, action.payload])
                    );
                }
            }),
            map(
                action => new ScheduleActions.CreateFilmSuccess(action.payload)
            ),
            catchError(err => of(new ScheduleActions.CreateFilmError(err)))
        );

        this.deleteFilm$ = this.actions$.pipe(
            ofType<ScheduleActions.DeleteFilm>(
                ScheduleActions.ScheduleActionTypes.DELETE_FILM
            ),
            tap(action => {
                const uid = action.payload.id;
                const films = JSON.parse(
                    localStorage.getItem('schedule') || '[]'
                );
                localStorage.setItem(
                    'schedule',
                    JSON.stringify(films.filter(film => film.id !== uid))
                );
            }),
            map(
                action => new ScheduleActions.CreateFilmSuccess(action.payload)
            ),
            catchError(err => of(new ScheduleActions.CreateFilmError(err)))
        );
    }
}
