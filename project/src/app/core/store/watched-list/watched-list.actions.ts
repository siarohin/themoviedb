import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum WatchedListActionTypes {
    CREATE_FILM = '[WatchedList] CREATE_FILM',
    CREATE_FILM_SUCCESS = '[WatchedList] CREATE_FILM_SUCCESS',
    CREATE_FILM_ERROR = '[WatchedList] CREATE_FILM_ERROR',
    DELETE_FILM = '[WatchedList] DELETE_FILM',
    DELETE_FILM_SUCCESS = '[WatchedList] DELETE_FILM_SUCCESS',
    DELETE_FILM_ERROR = '[WatchedList] DELETE_FILM_ERROR'
}

export class CreateWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.CREATE_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class CreateWatchedFilmSuccess implements Action {
    readonly type = WatchedListActionTypes.CREATE_FILM_SUCCESS;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class CreateWatchedFilmError implements Action {
    readonly type = WatchedListActionTypes.CREATE_FILM_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export class DeleteWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.DELETE_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteWatchedFilmSuccess implements Action {
    readonly type = WatchedListActionTypes.DELETE_FILM_SUCCESS;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteWatchedFilmError implements Action {
    readonly type = WatchedListActionTypes.DELETE_FILM_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export type WatchedListActions =
    | CreateWatchedFilm
    | CreateWatchedFilmSuccess
    | CreateWatchedFilmError
    | DeleteWatchedFilm
    | DeleteWatchedFilmSuccess
    | DeleteWatchedFilmError;
