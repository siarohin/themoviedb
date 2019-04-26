import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum WatchedListActionTypes {
    GET_WATCHED_FILMS = '[WatchedList] GET_WATCHED_FILMS',
    GET_WATCHED_FILM = '[WatchedList] GET_WATCHED_FILM',
    CREATE_WATCHED_FILM = '[WatchedList] CREATE_WATCHED_FILM',
    UPDATE_WATCHED_FILM = '[WatchedList] UPDATE_WATCHED_FILM',
    DELETE_WATCHED_FILM = '[WatchedList] DELETE_WATCHED_FILM'
}

export class GetWatchedFilms implements Action {
    readonly type = WatchedListActionTypes.GET_WATCHED_FILMS;
}

export class GetWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.GET_WATCHED_FILM;
    public payload: number;
    constructor(payload: number) {
        this.payload = payload;
    }
}

export class CreateWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.CREATE_WATCHED_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class UpdateWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.UPDATE_WATCHED_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export class DeleteWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.DELETE_WATCHED_FILM;
    public payload: Film;
    constructor(payload: Film) {
        this.payload = payload;
    }
}

export type WatchedListActions =
    | GetWatchedFilms
    | GetWatchedFilm
    | CreateWatchedFilm
    | UpdateWatchedFilm
    | DeleteWatchedFilm;
