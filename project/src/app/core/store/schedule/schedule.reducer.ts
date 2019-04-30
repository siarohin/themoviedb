import * as _ from 'lodash';

import { ScheduleActionTypes, ScheduleActions } from './schedule.actions';
import { ScheduleState, InitialScheduleState } from './schedule.state';

export function scheduleReducer(
    state = InitialScheduleState,
    action: ScheduleActions
): ScheduleState {
    switch (action.type) {
        /**
         * get films to watch list from localStorage
         */
        case ScheduleActionTypes.GET_FILMS: {
            return _.assign(
                {},
                {
                    ...state,
                    loading: true
                }
            );
        }

        case ScheduleActionTypes.GET_FILMS_SUCCESS: {
            return _.assign({}, state, {
                filmsToWatch: action.payload,
                loading: false,
                loaded: true
            });
        }

        case ScheduleActionTypes.GET_FILMS_ERROR: {
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
         * add film to watch list
         */
        case ScheduleActionTypes.CREATE_FILM: {
            return _.assign(
                {},
                {
                    ...state,
                    loading: true
                }
            );
        }

        case ScheduleActionTypes.CREATE_FILM_SUCCESS: {
            return _.assign({}, state, {
                filmsToWatch: [...state.filmsToWatch, action.payload],
                loading: false,
                loaded: true
            });
        }

        case ScheduleActionTypes.CREATE_FILM_ERROR: {
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
         * delete film from watch list
         */
        case ScheduleActionTypes.DELETE_FILM: {
            return _.assign(
                {},
                {
                    ...state,
                    loading: true
                }
            );
        }

        case ScheduleActionTypes.DELETE_FILM_SUCCESS: {
            return _.assign({}, state, {
                filmsToWatch: action.payload,
                loading: false,
                loaded: true
            });
        }

        case ScheduleActionTypes.DELETE_FILM_ERROR: {
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
