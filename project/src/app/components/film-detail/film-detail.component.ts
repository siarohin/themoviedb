import { Component, Input, HostBinding } from '@angular/core';

import { FilmInterface } from '../../interfaces/film.interface';

@Component({
    selector: 'app-film-detail',
    templateUrl: './film-detail.component.html',
    styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent {
    @HostBinding('class')
    public className = 'main__film-detail';

    @Input()
    public film: FilmInterface;

    constructor() {}
}
