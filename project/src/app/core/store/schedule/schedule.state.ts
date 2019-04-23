import { FilmInterface } from '../../index';

export interface ScheduleState {
    data: ReadonlyArray<FilmInterface>;
}

export const InitialScheduleState: ScheduleState = {
    data: [{ original_title: 'aaa', id: 2, title: 'aaa' }]
};
