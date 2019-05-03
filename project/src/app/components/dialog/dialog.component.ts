import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {
    DialogModel,
    DialogWithTitleModel,
    ScheduleStoreService,
    WatchedListStoreService
} from '../../core/index';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    private dialogRef: MatDialogRef<DialogModel>;
    private scheduleStoreService: ScheduleStoreService;
    private watchedListStoreService: WatchedListStoreService;

    /**
     * title and message params
     */
    public data: DialogWithTitleModel;

    constructor(
        scheduleStoreService: ScheduleStoreService,
        watchedListStoreService: WatchedListStoreService,
        dialogRef: MatDialogRef<DialogModel>,
        @Inject(MAT_DIALOG_DATA) data: DialogWithTitleModel
    ) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.scheduleStoreService = scheduleStoreService;
        this.watchedListStoreService = watchedListStoreService;
    }

    public onCancelClick(): void {
        this.dialogRef.close();
    }

    public onSubmitClick(film): void {
        this.watchedListStoreService.createWatchedFilm(film);
        this.scheduleStoreService.deleteFilmToWatch(film);
        this.dialogRef.close();
    }
}
