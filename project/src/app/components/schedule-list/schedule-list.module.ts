import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';

import { ScheduleListComponent } from './schedule-list.component';
import { DialogComponent } from '../dialog/dialog.component';

@NgModule({
    declarations: [ScheduleListComponent, DialogComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatDialogModule
    ],
    entryComponents: [DialogComponent]
})
export class ScheduleListModule {}
