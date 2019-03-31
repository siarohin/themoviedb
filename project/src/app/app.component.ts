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
  filmActors: [];
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
    this.onSubscribeFilmList(value);
    if (this.selectedFilm) this.selectedFilm = this.filmList[0];
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
                imgURL: film.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${film.poster_path}` : '../assets/images/empty.png',
                vote: `${film.vote_average}`,
                release: `${film.release_date}`,
                overview: `${film.overview}`
              }
            })
          },
          error => console.log(`Error: ${error}`),
          () => console.log('Completed onSubscribeFilmList'));
    }
  }

  onSubscribeFilmActors(value: string) {
    return this.filmService.getActorList(value)
      .subscribe(
        response => console.log(response),
        error => console.log(`Error: ${error}`),
          () => console.log('Completed onSubscribeFilmActors'));
  }

  findFilmDescription(value: string): void {
    const existingFilm = this.filmList.find(film => film.id === value);
    if (existingFilm) this.selectedFilm = existingFilm;
  }

  onFilmListClick(event): void {
    const { id } = event.currentTarget;
    this.findFilmDescription(id);
    this.onSubscribeFilmActors(322740); // TODO Delete DEMO
  }
}
