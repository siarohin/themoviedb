import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum ScheduleActionTypes {
    GET_FILMS = '[Schedule] GET_FILMS',
    GET_FILM = '[Schedule] GET_FILM',
    CREATE_FILM = '[Schedule] CREATE_FILM',
    UPDATE_FILM = '[Schedule] UPDATE_FILM',
    DELETE_FILM = '[Schedule] DELETE_FILM'
}

export class CreateFilm implements Action {
    readonly type = ScheduleActionTypes.CREATE_FILM;
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

export type ScheduleActions = CreateFilm | DeleteFilm;
