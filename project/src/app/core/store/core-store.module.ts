import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
    scheduleReducer,
    ScheduleEffects
} from '../../core/store/schedule/index';
import {
    watchedListReducer,
    WatchedListEffects
} from '../../core/store/watched-list/index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot({
            schedule: scheduleReducer,
            watched: watchedListReducer
        }),
        EffectsModule.forRoot([ScheduleEffects, WatchedListEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 5
        })
    ]
})
export class CoreStoreModule {}
