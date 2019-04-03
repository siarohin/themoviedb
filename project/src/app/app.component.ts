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

  onInputFocus($event): void {
    this.inputFocusActive = true;
  }

  onInputBlur($event): void {
    this.inputFocusActive = false;
  }

  onInputChange(value) {
    this.filmService.onSubscribeFilmList(value);
    if (this.selectedFilm) {
      this.selectedFilm = this.filmList[0];
    }
  }

  onFilmListClick($event): void {
    const { id } = $event.currentTarget;
    const filmWithDescription = this.filmList.find(film => film.id === id);
    if (filmWithDescription) {
      this.selectedFilm = filmWithDescription;
    }
  }
}
