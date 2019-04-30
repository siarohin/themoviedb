import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum ScheduleActionTypes {
    GET_FILMS = '[Schedule] GET_FILMS',
    GET_FILMS_SUCCESS = '[Schedule] GET_FILMS_SUCCESS',
    GET_FILMS_ERROR = '[Schedule] GET_FILMS_ERROR',
    CREATE_FILM = '[Schedule] CREATE_FILM',
    CREATE_FILM_SUCCESS = '[Schedule] CREATE_FILM_SUCCESS',
    CREATE_FILM_ERROR = '[Schedule] CREATE_FILM_ERROR',
    DELETE_FILM = '[Schedule] DELETE_FILM',
    DELETE_FILM_SUCCESS = '[Schedule] DELETE_FILM_SUCCESS',
    DELETE_FILM_ERROR = '[Schedule] DELETE_FILM_ERROR'
}

export class GetFilms implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS;
    public payload: [];
    constructor(payload: []) {
        this.payload = payload;
    }
}

export class GetFilmsSuccess implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS_SUCCESS;
    public payload: Film[];
    constructor(payload: Film[]) {
        this.payload = payload;
    }
}

export class GetFilmsError implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export class CreateFilm implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class CreateFilmSuccess implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM_SUCCESS;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class CreateFilmError implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export class DeleteFilm implements Action {
    readonly type = ScheduleActionTypes.DELETE_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteFilmSuccess implements Action {
    readonly type = ScheduleActionTypes.DELETE_FILM_SUCCESS;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteFilmError implements Action {
    readonly type = ScheduleActionTypes.DELETE_FILM_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export type ScheduleActions =
    | GetFilms
    | GetFilmsSuccess
    | GetFilmsError
    | CreateFilm
    | CreateFilmSuccess
    | CreateFilmError
    | DeleteFilm
    | DeleteFilmSuccess
    | DeleteFilmError;
