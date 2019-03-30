import { Component, Optional } from '@angular/core';
import { FilmService } from './film.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie';
  inputValue: string;
  inputFocusActive: boolean = false;
  filmList: object[];

  constructor(private filmService: FilmService) {
  }

  onInit() {
  }

  onInputFocus(event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur(event: Event): void {
    this.inputFocusActive = false;
  }

  onInputChange(value: string): void {
    this.inputValue = value;
    this.filmList = this.filmService.getData(value);
  }
}
