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
        case WatchedListActionTypes.GET_WATCHED_FILMS: {
            return { ...state };
        }

        case WatchedListActionTypes.GET_WATCHED_FILM: {
            return { ...state };
        }

        /**
         * add film to watch list
         */
        case WatchedListActionTypes.CREATE_WATCHED_FILM: {
            const uid = (action.payload as Film).id;
            const filmInState = state.watchedFilms.find(
                film => film.id === uid
            );
            if (!filmInState) {
                return _.assign({}, state, {
                    filmsToWatch: [
                        ...state.watchedFilms,
                        _.assign({}, action.payload, {
                            inScheduleList: true
                        })
                    ]
                });
            }
            return state;
        }

        case WatchedListActionTypes.UPDATE_WATCHED_FILM: {
            return { ...state };
        }

        /**
         * delete film from watch list
         */
        case WatchedListActionTypes.DELETE_WATCHED_FILM: {
            const uid = (action.payload as Film).id;
            return _.assign({}, state, {
                filmsToWatch: [
                    ...state.watchedFilms.filter(film => film.id !== uid)
                ]
            });
        }

        default: {
            return state;
        }
    }
}
