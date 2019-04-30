import * as _ from 'lodash';

import {
    WatchedListActionTypes,
    WatchedListActions
} from './watched-list.actions';
import {
    WatchedListState,
    InitialWatchedListState
} from './watched-list.state';

export function watchedListReducer(
    state = InitialWatchedListState,
    action: WatchedListActions
): WatchedListState {
    switch (action.type) {
        /**
         * get films to watch list from localStorage
         */
        case WatchedListActionTypes.GET_FILMS: {
            return _.assign(
                {},
                {
                    ...state,
                    loading: true
                }
            );
        }

        /**
         * get films from state on init
         */
        case WatchedListActionTypes.GET_FILMS_SUCCESS: {
            return _.assign({}, state, {
                watchedFilms: action.payload,
                loading: false,
                loaded: true
            });
        }

        /**
         * error on init state
         */
        case WatchedListActionTypes.GET_FILMS_ERROR: {
            const error = action.payload;
            return _.assign(
                {},
                {
                    ...state,
                    loading: false,
                    loaded: false,
                    error
                }
            );
        }

        /**
         * add film to watched list
         */
        case WatchedListActionTypes.CREATE_FILM: {
            return _.assign(
                {},
                {
                    ...state,
                    loading: true
                }
            );
        }

        /**
         * add film in state
         */
        case WatchedListActionTypes.CREATE_FILM_SUCCESS: {
            return _.assign({}, state, {
                watchedFilms: [...state.watchedFilms, action.payload],
                loading: false,
                loaded: true
            });
        }

        /**
         * film in state or error
         */
        case WatchedListActionTypes.CREATE_FILM_ERROR: {
            const error = action.payload;
            return _.assign(
                {},
                {
                    ...state,
                    loading: false,
                    loaded: false,
                    error
                }
            );
        }

        /**
         * delete film from watched list
         */
        case WatchedListActionTypes.DELETE_FILM: {
            return _.assign(
                {},
                {
                    ...state,
                    loading: true
                }
            );
        }

        /**
         * film exist in state
         */
        case WatchedListActionTypes.DELETE_FILM_SUCCESS: {
            return _.assign({}, state, {
                watchedFilms: action.payload,
                loading: false,
                loaded: true
            });
        }

        /**
         * film dont exist in state or error
         */
        case WatchedListActionTypes.DELETE_FILM_ERROR: {
            const error = action.payload;
            return _.assign(
                {},
                {
                    ...state,
                    loading: false,
                    loaded: false,
                    error
                }
            );
        }

        default: {
            return state;
        }
    }
}
