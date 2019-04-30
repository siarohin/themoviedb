import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import * as WatchedListActions from './watched-list.actions';

@Injectable()
export class WatchedListEffects {
    @Effect()
    public createFilm$: Actions;

    @Effect()
    deleteFilm$: Actions;

    constructor(private actions$: Actions) {
        this.actions$ = actions$;
        this.createFilm$ = this.actions$.pipe(
            ofType<WatchedListActions.CreateWatchedFilm>(
                WatchedListActions.WatchedListActionTypes.CREATE_FILM
            ),
            tap(action => {
                const uid = action.payload.id;
                const films = JSON.parse(
                    localStorage.getItem('watched') || '[]'
                );
                const filmInStorage = films.find(film => film.id === uid);

                if (!filmInStorage) {
                    localStorage.setItem(
                        'watched',
                        JSON.stringify([...films, action.payload])
                    );
                }
            }),
            map(
                action =>
                    new WatchedListActions.CreateWatchedFilmSuccess(
                        action.payload
                    )
            ),
            catchError(err =>
                of(new WatchedListActions.CreateWatchedFilmError(err))
            )
        );

        this.deleteFilm$ = this.actions$.pipe(
            ofType<WatchedListActions.DeleteWatchedFilm>(
                WatchedListActions.WatchedListActionTypes.DELETE_FILM
            ),
            tap(action => {
                const uid = action.payload.id;
                const films = JSON.parse(
                    localStorage.getItem('watched') || '[]'
                );
                localStorage.setItem(
                    'watched',
                    JSON.stringify(films.filter(film => film.id !== uid))
                );
            }),
            map(
                action =>
                    new WatchedListActions.DeleteWatchedFilmSuccess(
                        action.payload
                    )
            ),
            catchError(err =>
                of(new WatchedListActions.DeleteWatchedFilmError(err))
            )
        );
    }
}
