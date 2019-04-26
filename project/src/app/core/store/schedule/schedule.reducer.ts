import * as _ from 'lodash';

import { ScheduleActionTypes, ScheduleActions } from './schedule.actions';
import { ScheduleState, InitialScheduleState } from './schedule.state';

import { Film } from '../../models';

export function scheduleReducer(
    state = InitialScheduleState,
    action: ScheduleActions
): ScheduleState {
    switch (action.type) {
        /**
         * add film to watch list
         */
        case ScheduleActionTypes.CREATE_FILM: {
            const uid = (action.payload as Film).id;
            const filmInState = state.filmsToWatch.find(
                film => film.id === uid
            );
            if (!filmInState) {
                return _.assign({}, state, {
                    filmsToWatch: [
                        ...state.filmsToWatch,
                        _.assign({}, action.payload, {
                            inScheduleList: true
                        })
                    ]
                });
            }
            return state;
        }

        /**
         * delete film from watch list
         */
        case ScheduleActionTypes.DELETE_FILM: {
            const uid = (action.payload as Film).id;
            return _.assign({}, state, {
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
