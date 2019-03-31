import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie';
  inputFocusActive: boolean = false;
  filmList: FilmInterface[];
  selectedFilm?: FilmInterface;

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

  onInputChange(event) {
    const { value } = event.target;
    this.onSubscribe(value);
    if (this.selectedFilm) this.selectedFilm = this.filmList[0];
  }

  onSubscribe(value) {
    if (value.length > 2) {
      return this.filmService.getFilmList(value)
        .subscribe(response => this.filmList = response);
    }
  }

  findFilmDescription(value: string): void {
    const existingFilm = this.filmList.find(film => film.id === value);
    if (existingFilm) this.selectedFilm = existingFilm;
  }

  onFilmListClick(event): void {
    const { id } = event.target;
    this.findFilmDescription(id);
  }
}
