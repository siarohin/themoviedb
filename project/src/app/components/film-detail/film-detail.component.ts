import { Component, Input, HostBinding } from '@angular/core';

import { Film } from '../../core/index';

@Component({
    selector: 'app-film-detail',
    templateUrl: './film-detail.component.html',
    styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent {
    /**
     * add class to <app-film-detail /> component
     */
    @HostBinding('class')
    public className = 'main__film-detail';

    /**
     * get film with description from App component
     * render into template
     */
    @Input()
    public film: Film;

    constructor() {}
}
