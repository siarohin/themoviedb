import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import {
    DialogWithTitle,
    Film,
    MessageConfirmDelete,
    Buttons
} from '../../core/index';

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

    /**
     * dialog message
     */
    public message: MessageConfirmDelete;

    /** buttons text */
    public button: Buttons;

    constructor(@Inject(MAT_DIALOG_DATA) data: DialogWithTitle) {
        this.film = data.film;
        this.message = {
            title: `Please, confirm action`,
            content: `The ${
                this.film.title
            } will be remove from schedule list. Are you sure?`
        };
        this.button = {
            submit: `Yes, sure`,
            cancel: `No, thanks`
        };
    }
}
