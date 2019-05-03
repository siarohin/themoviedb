import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Film } from '../../core/index';

export class DialogWithTitleModel {
    title?: string;
    message: Film | string;
}

export class DialogModel {
    width?: string;
    height?: string;
    data: DialogWithTitleModel | string;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    public dialogRef: MatDialogRef<DialogModel>;

    constructor(
        dialogRef: MatDialogRef<DialogModel>,
        @Inject(MAT_DIALOG_DATA) public data: DialogWithTitleModel
    ) {
        this.dialogRef = dialogRef;
        this.data = data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
