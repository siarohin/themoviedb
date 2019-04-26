import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum WatchedListActionTypes {
    CREATE_WATCHED_FILM = '[WatchedList] CREATE_WATCHED_FILM',
    DELETE_WATCHED_FILM = '[WatchedList] DELETE_WATCHED_FILM'
}

export class CreateWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.CREATE_WATCHED_FILM;
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

export type WatchedListActions = CreateWatchedFilm | DeleteWatchedFilm;
