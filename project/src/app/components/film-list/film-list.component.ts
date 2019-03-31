import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  @HostBinding('class') className = 'main__film-list';

  @Input()
  films: object[];

  @Output()
  onFilmClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick(event): void {
    const filmList = document.querySelectorAll('.list-items > li');
    filmList.forEach(film => film.classList.remove('active'));
    event.target.classList.add('active');
    this.onFilmClick.emit(event);
  }

}
