import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputFocusActive = false;
  filmList: FilmInterface[];
  actorList;
  selectedFilm?: FilmInterface;

  constructor(private filmService: FilmService) {
  }

  onInputFocus(event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur(event: Event): void {
    this.inputFocusActive = false;
  }

  onInputChange(event) {
    const { value } = event.target;
    this.onSubscribeFilmList(value);
    if (this.selectedFilm) { this.selectedFilm = this.filmList[0]; }
  }

  onSubscribeFilmList(value: string) {
    if (value.length > 2) {
      this.filmService.getFilmList(value)
        .subscribe(
          stream => {
            this.filmList = stream.map(film => {
              return {
                id: `${film.id}`,
                name: `${film.title}`,
                fullName: `${film.original_title}`,
                // tslint:disable-next-line: max-line-length
                imgURL: film.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${film.poster_path}` : '../assets/images/empty.png',
                vote: `${film.vote_average}`,
                release: `${film.release_date}`,
                overview: `${film.overview}`
              };
            });
          },
          error => console.log(`Error: ${error}`),
          // FilmList complete --> get film actors list
          () => this.onSubscribeFilmActors());
    }
  }

  onSubscribeFilmActors() {
    this.filmList.map(film => {
      return this.filmService.getActorList(film.id)
        .subscribe(
          stream => {
            this.actorList = {
              id: stream.id,
              actors: stream.cast.map(actor => actor.name),
            };
          },
          error => console.log(`Error: ${error}`));
    });
  }

  findFilmDescription(value: string): void {
    const existingFilm = this.filmList.find(film => film.id === value);
    if (existingFilm) { this.selectedFilm = existingFilm; }
  }

  onFilmListClick(event): void {
    const { id } = event.currentTarget;
    this.findFilmDescription(id);
    console.log(this.actorList);
  }
}
