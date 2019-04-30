import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum WatchedListActionTypes {
    GET_FILMS = '[WatchedList] GET_FILMS',
    GET_FILMS_SUCCESS = '[WatchedList] GET_FILMS_SUCCESS',
    GET_FILMS_ERROR = '[WatchedList] GET_FILMS_ERROR',
    CREATE_FILM = '[WatchedList] CREATE_FILM',
    CREATE_FILM_SUCCESS = '[WatchedList] CREATE_FILM_SUCCESS',
    CREATE_FILM_ERROR = '[WatchedList] CREATE_FILM_ERROR',
    DELETE_FILM = '[WatchedList] DELETE_FILM',
    DELETE_FILM_SUCCESS = '[WatchedList] DELETE_FILM_SUCCESS',
    DELETE_FILM_ERROR = '[WatchedList] DELETE_FILM_ERROR'
}

export class GetWatchedFilms implements Action {
    readonly type = WatchedListActionTypes.GET_FILMS;
    public payload: [];
    constructor(payload: []) {
        this.payload = payload;
    }
}

export class GetWatchedFilmsSuccess implements Action {
    readonly type = WatchedListActionTypes.GET_FILMS_SUCCESS;
    public payload: Film[];
    constructor(payload: Film[]) {
        this.payload = payload;
    }
}

export class GetWatchedFilmsError implements Action {
    readonly type = WatchedListActionTypes.GET_FILMS_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
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
    | GetWatchedFilms
    | GetWatchedFilmsSuccess
    | GetWatchedFilmsError
    | CreateWatchedFilm
    | CreateWatchedFilmSuccess
    | CreateWatchedFilmError
    | DeleteWatchedFilm
    | DeleteWatchedFilmSuccess
    | DeleteWatchedFilmError;
