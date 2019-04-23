import * as _ from 'lodash';

import { ScheduleActionTypes, ScheduleActions } from './schedule.actions';
import { ScheduleState, InitialScheduleState } from './schedule.state';

import { FilmInterface } from '../../models';
import { __assign } from 'tslib';

export function scheduleReducer(
    state = InitialScheduleState,
    action: ScheduleActions
): ScheduleState {
    console.log(`Reducer: Action come in ${action.type}`);

    switch (action.type) {
        case ScheduleActionTypes.GET_FILMS: {
            console.log(`GET_TASKS action beein handled!`);
            return { ...state };
        }

        case ScheduleActionTypes.GET_FILM: {
            console.log(`GET_FILM action beein handled!`);
            return { ...state };
        }

        case ScheduleActionTypes.CREATE_FILM: {
            console.log(state);
            const id = (action.payload as FilmInterface).id;
            const newState = state.data.concat(action.payload);
            return _.assign(state, newState);
        }

        case ScheduleActionTypes.UPDATE_FILM: {
            console.log(`UPDATE_FILM action beein handled!`);
            return { ...state };
        }

        case ScheduleActionTypes.DELETE_FILM: {
            console.log(`DELETE_FILM action beein handled!`);
            return { ...state };
        }

        default: {
            console.log(`UNKNOWN_SCHEDULE action beein handled!`);
            return state;
        }
    }
}
