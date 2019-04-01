import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { FilmInterface } from '../../interfaces/film.interface';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  @HostBinding('class') className = 'main__film-list';

  @Input()
  films: FilmInterface[];

// tslint:disable-next-line: no-output-on-prefix
  @Output()
  onFilmClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick(event): void {
    this.onFilmClick.emit(event);
  }

}
