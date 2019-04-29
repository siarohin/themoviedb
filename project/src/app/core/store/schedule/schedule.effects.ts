import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import * as ScheduleActions from './index';

@Injectable()
export class ScheduleEffects {
    // private actions$: Actions;

    constructor(private actions$: Actions) {
        // this.actions$ = actions$;
    }

    @Effect()
    createFilm$: Observable<Action> = this.actions$.pipe(
        ofType<ScheduleActions.CreateFilm>(
            ScheduleActions.ScheduleActionTypes.CREATE_FILM
        ),
        tap(action => {
            const totalLocalStorage = JSON.parse(
                localStorage.getItem('schedule')
            );
            if (totalLocalStorage !== null) {
                localStorage.setItem('schedule', [
                    ...totalLocalStorage,
                    JSON.stringify(action.payload)
                ]);
            } else {
                localStorage.setItem(
                    'schedule',
                    JSON.stringify(action.payload)
                );
            }
        }),
        map(action => new ScheduleActions.CreateFilmSuccess(action.payload)),
        catchError(err => of(new ScheduleActions.CreateFilmError(err)))
    );
}
