import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ScheduleState } from './schedule.state';

export const getScheduleState = createFeatureSelector<ScheduleState>(
    'schedule'
);

export const getFilmsToWatch = createSelector(
    getScheduleState,
    (state: ScheduleState) => state.filmsToWatch
);
