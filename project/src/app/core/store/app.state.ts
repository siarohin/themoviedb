import { ScheduleState } from './schedule/schedule.state';
import { WatchedListState } from './watched-list/watched-list.state';

export interface AppState {
    schedule: ScheduleState;
    watched: WatchedListState;
}
