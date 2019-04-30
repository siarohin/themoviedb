import * as _ from 'lodash';

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

        this.getFilms$ = this.actions$.pipe(
            ofType<WatchedListActions.GetWatchedFilms>(
                WatchedListActions.WatchedListActionTypes.GET_FILMS
            ),
            map(() => {
                const films = JSON.parse(
                    localStorage.getItem(this.localStorageKey) || '[]'
                );
                return new WatchedListActions.GetWatchedFilmsSuccess(films);
            }),
            catchError(err =>
                of(new WatchedListActions.GetWatchedFilmsError(err))
            )
        );

        this.createFilm$ = this.actions$.pipe(
            ofType<WatchedListActions.CreateWatchedFilm>(
                WatchedListActions.WatchedListActionTypes.CREATE_FILM
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
                return new WatchedListActions.CreateWatchedFilmSuccess(
                    action.payload
                );
            }),
            catchError(err =>
                of(new WatchedListActions.CreateWatchedFilmError(err))
            )
        );

        this.deleteFilm$ = this.actions$.pipe(
            ofType<WatchedListActions.DeleteWatchedFilm>(
                WatchedListActions.WatchedListActionTypes.DELETE_FILM
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
                return new WatchedListActions.DeleteWatchedFilmSuccess(
                    action.payload
                );
            }),
            catchError(err =>
                of(new WatchedListActions.DeleteWatchedFilmError(err))
            )
        );
    }
}
