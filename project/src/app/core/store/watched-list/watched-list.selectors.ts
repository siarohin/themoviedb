import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WatchedListState } from './watched-list.state';

export const getWatchedListState = createFeatureSelector<WatchedListState>(
    'watched'
);

export const getWatchedFilms = createSelector(
    getWatchedListState,
    (state: WatchedListState) => state.watchedFilms
);
