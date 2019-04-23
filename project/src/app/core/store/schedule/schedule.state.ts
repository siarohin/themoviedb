import { FilmInterface } from '../../index';

export interface ScheduleState {
    data: ReadonlyArray<FilmInterface>;
}

export const InitialScheduleState: ScheduleState = {
    data: []
};
