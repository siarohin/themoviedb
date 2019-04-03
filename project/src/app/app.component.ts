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
    if (value.length > 0) {
      this.filmService.onSubscribeFilmList(value)
        .subscribe(stream => this.filmList = stream.map(film => {
          return {
            id: `${film.id}`,
            name: `${film.title}`,
            fullName: `${film.original_title}`,
            // tslint:disable-next-line: max-line-length
            imgURL: film.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${film.poster_path}` : '../assets/images/empty.png',
            vote: `${film.vote_average}`,
            release: `${film.release_date}`,
            overview: `${film.overview}`,
            actors: `${film.actors}`
          }
      }));
    }
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
