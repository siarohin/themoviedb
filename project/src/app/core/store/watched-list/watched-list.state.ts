import { Film } from '../../index';

export interface WatchedListState {
    watchedFilms: ReadonlyArray<Film>;
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: Error | string;
}

export const InitialWatchedListState: WatchedListState = {
    watchedFilms: [],
    loading: false,
    loaded: false,
    error: null
};
