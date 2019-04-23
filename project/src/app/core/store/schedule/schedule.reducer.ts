import { ScheduleActionTypes, ScheduleActions } from './schedule.actions';
import { ScheduleState, InitialScheduleState } from './schedule.state';

export function scheduleReduccer(
    state = InitialScheduleState,
    action: ScheduleActions
): ScheduleState {
    console.log(`Action come in ${action.type}`);

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
            console.log(`CREATE_FILM action beein handled!`);
            return { ...state };
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
