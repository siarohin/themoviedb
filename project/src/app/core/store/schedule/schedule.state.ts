import { Film } from '../../index';

export interface ScheduleState {
    filmsToWatch: ReadonlyArray<Film>;
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: Error | string;
}

export const InitialScheduleState: ScheduleState = {
    filmsToWatch: [],
    loading: false,
    loaded: false,
    error: null
};
