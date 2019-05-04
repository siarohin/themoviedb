import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subscription } from 'rxjs';

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
export class ScheduleListComponent implements OnInit, OnDestroy {
    private scheduleStoreService: ScheduleStoreService;
    private watchedListStoreService: WatchedListStoreService;
    private dialog: MatDialog;
    private dialogRef: MatDialogRef<DialogComponent>;
    private dialogRefSubscribtion: Subscription;

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

    public ngOnDestroy(): void {
        if (this.dialogRefSubscribtion) {
            this.dialogRefSubscribtion.unsubscribe();
        }
    }

    /**
     * add or delete film to watchList from checkbox event
     */
    public checkBoxChange($event, film) {
        if ($event.checked) {
            this.openDialog(film);
        } else {
            this.watchedListStoreService.deleteWatchedFilm(film);
        }
    }

    /**
     * open new dialog window on delete film
     */
    public openDialog(film): void {
        this.dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            height: '300px',
            data: { film }
        });
        this.dialogRefSubscribtion = this.dialogRef
            .afterClosed()
            .subscribe(result => {
                if (!!result) {
                    this.watchedListStoreService.createWatchedFilm(film);
                    this.scheduleStoreService.deleteFilmToWatch(film);
                }
                this.dialogRef.close();
            });
    }
}
