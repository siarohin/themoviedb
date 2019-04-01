import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';
import { ActorInterface } from './interfaces/actor.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputFocusActive = false;
  selectedFilm?: FilmInterface | ActorInterface;
  filmList?: (FilmInterface | ActorInterface)[];

  constructor(private filmService: FilmService) {
  }

  onInputFocus($event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur($event: Event): void {
    this.inputFocusActive = false;
  }

  onInputChange($event) {
    const { value } = $event.target;
    this.filmList = this.filmService.getFilmsList(value);
    if (this.selectedFilm) {
      this.selectedFilm = this.filmList[0];
    }
  }

  findFilmDescription(value: string): void {
    const existingFilm = this.filmList.find(film => film.id === value);
    if (existingFilm) {
      this.selectedFilm = existingFilm;
    }
  }

  onFilmListClick($event): void {
    const { id } = $event.currentTarget;
    this.findFilmDescription(id);
  }
}
