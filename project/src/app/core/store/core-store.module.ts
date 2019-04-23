import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { scheduleReducer } from '../../core/store/index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('schedule', scheduleReducer)
    ]
})
export class CoreStoreModule {}
