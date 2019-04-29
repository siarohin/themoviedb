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
                    ]
                });
            }
            return state;
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
