import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import {
    Film,
    ScheduleStoreService,
    WatchedListStoreService
} from '../../core/index';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    private scheduleStoreService: ScheduleStoreService;
    private watchedListStoreService: WatchedListStoreService;
    private dialog: MatDialog;
    private dialogRef: MatDialogRef<DialogComponent>;

    /**
     * selector,
     * 'filmsToWatch' from state
     */
    public filmList$: Observable<Film>;

    constructor(
        scheduleStoreService: ScheduleStoreService,
        watchedListStoreService: WatchedListStoreService,
        dialog: MatDialog
    ) {
        this.scheduleStoreService = scheduleStoreService;
        this.watchedListStoreService = watchedListStoreService;
        this.dialog = dialog;
    }

    public ngOnInit(): void {
        this.filmList$ = this.scheduleStoreService.getFilmsToWatch();
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public checkBoxChange($event, film) {
        if ($event.checked) {
            this.openDialog(
                `Are you sure?`,
                `The ${film.title} will be delete from schedule list`,
                $event,
                film
            );
        } else {
            this.watchedListStoreService.deleteWatchedFilm(film);
        }
    }

    /**
     * open new dialog window on delete film
     */
    public openDialog(title, message, $event, film): void {
        this.dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            height: '300px',
            data: { title, message, $event, film }
        });
        this.dialogRef.afterClosed().subscribe(console.log);
    }
}
