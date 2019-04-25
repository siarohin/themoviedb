import { createFeatureSelector } from '@ngrx/store';

import { ScheduleState } from './schedule.state';

export const getScheduleState = createFeatureSelector<ScheduleState>(
    'schedule'
);
