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

export class GetFilmsToWatch implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS;
    public payload: [];
    constructor(payload: []) {
        this.payload = payload;
    }
}

export class GetFilmsToWatchSuccess implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS_SUCCESS;
    public payload: Film[];
    constructor(payload: Film[]) {
        this.payload = payload;
    }
}

export class GetFilmsToWatchError implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export class CreateFilmToWatch implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class CreateFilmToWatchSuccess implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM_SUCCESS;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class CreateFilmToWatchError implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export class DeleteFilmToWatch implements Action {
    readonly type = ScheduleActionTypes.DELETE_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteFilmToWatchSuccess implements Action {
    readonly type = ScheduleActionTypes.DELETE_FILM_SUCCESS;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteFilmToWatchError implements Action {
    readonly type = ScheduleActionTypes.DELETE_FILM_ERROR;
    public payload: Error | string;
    constructor(payload: Error | string) {
        this.payload = payload;
    }
}

export type ScheduleActions =
    | GetFilmsToWatch
    | GetFilmsToWatchSuccess
    | GetFilmsToWatchError
    | CreateFilmToWatch
    | CreateFilmToWatchSuccess
    | CreateFilmToWatchError
    | DeleteFilmToWatch
    | DeleteFilmToWatchSuccess
    | DeleteFilmToWatchError;
