import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { DialogWithTitleModel } from '../../core/index';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    /**
     * title and message params
     */
    public data: DialogWithTitleModel;

    constructor(@Inject(MAT_DIALOG_DATA) data: DialogWithTitleModel) {
        this.data = data;
    }
}
