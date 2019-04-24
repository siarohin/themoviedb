import * as _ from 'lodash';

import { ScheduleActionTypes, ScheduleActions } from './schedule.actions';
import { ScheduleState, InitialScheduleState } from './schedule.state';

import { FilmInterface } from '../../models';
import { __assign } from 'tslib';

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
            const uid = (action.payload as FilmInterface).id;
            const filmInState = state.data.find(film => film.id === uid);
            if (!filmInState) {
                return _.assign(state, {
                    data: [...state.data, action.payload]
                });
            }
            return state;
        }

        case ScheduleActionTypes.UPDATE_FILM: {
            return { ...state };
        }

        case ScheduleActionTypes.DELETE_FILM: {
            return { ...state };
        }

        default: {
            return state;
        }
    }
}
