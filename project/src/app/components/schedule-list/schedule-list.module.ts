import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ScheduleListComponent } from './schedule-list.component';

@NgModule({
    declarations: [ScheduleListComponent],
    imports: [CommonModule, BrowserAnimationsModule, MatCheckboxModule]
})
export class ScheduleListModule {}
