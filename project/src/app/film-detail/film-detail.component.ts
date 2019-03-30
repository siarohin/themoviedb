import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  @HostBinding('class') className = 'main__film-detail';

  constructor() { }

  ngOnInit() {
  }

}
