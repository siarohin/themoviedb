import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum ScheduleActionTypes {
    GET_FILMS = '[Schedule] GET_FILMS',
    GET_FILM = '[Schedule] GET_FILM',
    CREATE_FILM = '[Schedule] CREATE_FILM',
    UPDATE_FILM = '[Schedule] UPDATE_FILM',
    DELETE_FILM = '[Schedule] DELETE_FILM'
}

export class GetFilms implements Action {
    readonly type = ScheduleActionTypes.GET_FILMS;
}

export class GetFilm implements Action {
    readonly type = ScheduleActionTypes.GET_FILM;
    public payload: number;
    constructor(payload: number) {
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

export class UpdateFilm implements Action {
    readonly type = ScheduleActionTypes.UPDATE_FILM;
    public payload: Film;
    constructor(payload: Film) {
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
    | GetFilms
    | GetFilm
    | CreateFilm
    | UpdateFilm
    | DeleteFilm;
