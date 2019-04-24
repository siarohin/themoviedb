import * as _ from 'lodash';

import { ScheduleActionTypes, ScheduleActions } from './schedule.actions';
import { ScheduleState, InitialScheduleState } from './schedule.state';

import { Film } from '../../models';

export function scheduleReducer(
    state = InitialScheduleState,
    action: ScheduleActions
): ScheduleState {
    switch (action.type) {
        case ScheduleActionTypes.GET_FILMS: {
            return { ...state };
        }

        case ScheduleActionTypes.GET_FILM: {
            return { ...state };
        }

        /**
         * add film to watch list
         */
        case ScheduleActionTypes.CREATE_FILM: {
            const uid = (action.payload as Film).id;
            const filmInState = state.filmsToWatch.find(
                film => film.id === uid
            );
            if (!filmInState) {
                return _.assign(state, {
                    filmsToWatch: [...state.filmsToWatch, action.payload]
                });
            }
            return state;
        }

        case ScheduleActionTypes.UPDATE_FILM: {
            return { ...state };
        }

        /**
         * delete film from watch list
         */
        case ScheduleActionTypes.DELETE_FILM: {
            const uid = (action.payload as Film).id;
            return _.assign(state, {
                filmsToWatch: [
                    ...state.filmsToWatch.filter(film => film.id !== uid)
                ]
            });
        }

        default: {
            return state;
        }
    }
}
