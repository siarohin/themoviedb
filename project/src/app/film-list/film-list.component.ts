import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  @HostBinding('class') className = 'main__film-list';

  @Input()
  films: object[];

  constructor() { }

  ngOnInit() {
  }

}
