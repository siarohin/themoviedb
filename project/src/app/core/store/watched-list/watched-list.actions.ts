import { Action } from '@ngrx/store';

import { Film } from '../../index';

export enum WatchedListActionTypes {
    CREATE_FILM = '[WatchedList] CREATE_WATCHED_FILM',
    DELETE_FILM = '[WatchedList] DELETE_WATCHED_FILM'
}

export class CreateWatchedFilm implements Action {
    readonly type = WatchedListActionTypes.CREATE_FILM;
    public payload: Film;
    constructor(payload: Film) {
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

export type WatchedListActions = CreateWatchedFilm | DeleteWatchedFilm;
