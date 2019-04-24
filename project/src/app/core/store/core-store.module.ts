import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { scheduleReducer } from '../../core/store/index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('schedule', scheduleReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 5
        })
    ]
})
export class CoreStoreModule {}
