import { FilmInterface } from '../../index';

export interface ScheduleState {
    data: ReadonlyArray<FilmInterface>;
}

export const InitialScheduleState: ScheduleState = {
    data: [
        { original_title: 'aaa', id: 2, title: 'aaa1' },
        { original_title: 'bbb', id: 3, title: 'bbb1' },
        { original_title: 'ccc', id: 4, title: 'ccc1' }
    ]
};
