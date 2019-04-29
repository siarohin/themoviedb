import { Film } from '../../index';

export interface WatchedListState {
    watchedFilms: ReadonlyArray<Film>;
}

export const InitialWatchedListState: WatchedListState = {
    watchedFilms: []
};
