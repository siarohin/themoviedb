import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { scheduleReducer } from '../../core/store/schedule/index';
import { watchedListReducer } from '../../core/store/watched-list/index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('schedule', scheduleReducer),
        StoreModule.forFeature('watched', watchedListReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 5
        })
    ]
})
export class CoreStoreModule {}
