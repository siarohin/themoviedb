import * as _ from 'lodash';

import {
    WatchedListActionTypes,
    WatchedListActions
} from './watched-list.actions';
import {
    WatchedListState,
    InitialWatchedListState
} from './watched-list.state';

import { Film } from '../../models';

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

        case WatchedListActionTypes.GET_FILMS_SUCCESS: {
            return _.assign({}, state, {
                watchedFilms: action.payload,
                loading: false,
                loaded: true
            });
        }

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

        case WatchedListActionTypes.CREATE_FILM_SUCCESS: {
            const uid = (action.payload as Film).id;
            const filmInState = state.watchedFilms.find(
                film => film.id === uid
            );
            if (!filmInState) {
                return _.assign({}, state, {
                    watchedFilms: [
                        ...state.watchedFilms,
                        _.assign({}, action.payload, {
                            inScheduleList: true
                        })
                    ],
                    loading: false,
                    loaded: true
                });
            }
            return _.assign(
                {},
                {
                    ...state,
                    loading: false,
                    loaded: true
                }
            );
        }

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

        case WatchedListActionTypes.DELETE_FILM_SUCCESS: {
            const uid = (action.payload as Film).id;
            return _.assign({}, state, {
                watchedFilms: [
                    ...state.watchedFilms.filter(film => film.id !== uid)
                ],
                loading: false,
                loaded: true
            });
        }

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
