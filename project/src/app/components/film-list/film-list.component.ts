import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FilmInterface } from '../../models/film.interface';

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
    public films: Array<FilmInterface>;

    /**
     * binding new event from click on <li /> with film
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onFilmClick: EventEmitter<string> = new EventEmitter<string>();

    /**
     * binding new event from click on <button /> Next
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onButtonClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    /**
     * emit event on click <li /> with film
     */
    public filmClick($event): void {
        this.onFilmClick.emit($event);
    }

    /**
     * emit event on button <li /> with film
     */
    public buttonClick($event): void {
        this.onButtonClick.emit($event);
    }
}
