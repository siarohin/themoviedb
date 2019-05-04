import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { DialogWithTitle, Film } from '../../core/index';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    /**
     * film
     */
    public film: Film;

    constructor(@Inject(MAT_DIALOG_DATA) data: DialogWithTitle) {
        this.film = data.film;
    }
}
