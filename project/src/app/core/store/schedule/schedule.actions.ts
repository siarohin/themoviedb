import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum ScheduleActionTypes {
    CREATE_FILM = '[Schedule] CREATE_FILM',
    CREATE_FILM_SUCCESS = '[Schedule] CREATE_FILM_SUCCESS',
    CREATE_FILM_ERROR = '[Schedule] CREATE_FILM_ERROR',
    DELETE_FILM = '[Schedule] DELETE_FILM'
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

export type ScheduleActions =
    | CreateFilm
    | CreateFilmSuccess
    | CreateFilmError
    | DeleteFilm;
