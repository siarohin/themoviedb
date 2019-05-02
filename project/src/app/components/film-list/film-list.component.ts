import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Film, ChangeBox } from '../../core/index';

@Component({
    selector: 'app-film-list',
    templateUrl: './film-list.component.html',
    styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {
    /**
     * get film`s array from App component
     * render <li /> with films in template
     */
    @Input()
    public films: Array<Film>;

    @Input()
    public filmsToWatch: Array<Film>;

    /**
     * binding new event from click on <li /> with film
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onFilmClick: EventEmitter<Film> = new EventEmitter<Film>();

    /**
     * binding new event from click on <button /> Next
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onButtonClick: EventEmitter<string> = new EventEmitter<string>();

    /**
     * binding new event from checkbox
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onCheckBoxChange: EventEmitter<ChangeBox> = new EventEmitter<
        ChangeBox
    >();

    constructor() {}

    /**
     * emit event on click <li /> with film
     */
    public filmClick(film: Film): void {
        this.onFilmClick.emit(film);
    }

    /**
     * emit event on button <li /> with film
     */
    public buttonClick($event): void {
        this.onButtonClick.emit($event);
    }

    /**
     * emit event on checkBox change (checked true | false ) with film and $event
     */
    public checkBoxChange($event, film): void {
        this.onCheckBoxChange.emit({
            event: $event,
            film
        });
    }
}
