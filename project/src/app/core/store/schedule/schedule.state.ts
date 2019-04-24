import { Film } from '../../index';

export interface ScheduleState {
    filmsToWatch: ReadonlyArray<Film>;
}

export const InitialScheduleState: ScheduleState = {
    filmsToWatch: []
};
