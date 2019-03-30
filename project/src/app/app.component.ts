import { Component } from '@angular/core';
import { FilmService } from './film.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie';
  inputFocusActive: boolean = false;
  filmList;

  constructor(private filmService: FilmService) {
  }

  ngOnInit(){

  }

  onInputFocus(event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur(event: Event): void {
    this.inputFocusActive = false;
  }

  onInputChange(event): void {
    const { value } = event.target;
    if (value.length > 2) {
      this.filmService.getFilmList(value)
        .subscribe(response => this.filmList = response);
    }
  }
}
