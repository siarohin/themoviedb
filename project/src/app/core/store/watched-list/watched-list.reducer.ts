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
            const uid = (action.payload as Film).id;
            return _.assign({}, state, {
                watchedFilms: [
                    ...state.watchedFilms.filter(film => film.id !== uid)
                ]
            });
        }

        default: {
            return state;
        }
    }
}
