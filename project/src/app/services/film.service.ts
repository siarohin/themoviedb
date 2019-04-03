import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';
import { ActorInterface } from '../interfaces/actor.interface';
import { Observable } from 'rxjs';

const params = {
  apiURL: 'https://api.themoviedb.org/3',
  apiKey: 'df56cf406d2c44e988b7705490bae759',
  page: 1
};

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  filmList: FilmInterface[];
  actorList?: ActorInterface[];
  filmListWithActors?: (FilmInterface | ActorInterface)[];

  constructor(private httpClient: HttpClient) { }

  observableActorList(value: string): Observable<ApiActorInterface> {
    const { apiURL } = params;
    return this.httpClient
      .get<ApiActorInterface>(`${apiURL}/movie/${value}/credits?api_key=${params.apiKey}`);
  }

  observableFilmList(value: string): Observable<ApiInterface> {
    const { apiURL, apiKey, page } = params;
    return this.httpClient
      .get<ApiInterface>(`${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`);
  }

  addFilmToList(stream): FilmInterface[] {
    return stream.map(film => {
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
  }

  onSubscribeFilmList(value: string): void {
    this.observableFilmList(value)
      .pipe(map(res => res.results))
      .subscribe(
        stream => this.filmList = this.addFilmToList(stream),
        error => console.log(`Error: ${error}`),
        // FilmList complete --> get film actors list
        () => {
          this.actorList = [];
          this.onSubscribeFilmActors();
      });
  }

  onSubscribeFilmActors(): void {
    this.filmList.map(film => {
      return this.observableActorList(film.id)
        .subscribe(
          stream => {
            const actor = {
              id: `${stream.id}`,
              actors: stream.cast.map(person => person.name),
            };
            this.actorList = this.actorList ? [actor, ...this.actorList] : [actor];
          },
          error => console.log(`Error: ${error}`),
          // ActorList complete --> get filmListWithActors
          () => this.getFilmListWithActors(this.filmList, this.actorList));
    });
  }

  getFilmListWithActors(filmList: FilmInterface[], actorList: ActorInterface[]): void {
    this.filmListWithActors = filmList.map(film => {
      const existingActor = actorList.find(actor => actor.id === film.id);
      if (existingActor) {
        const { actors } = existingActor;
        return Object.assign(film, { actors: actors.slice(0, 3) });
      }
      return Object.assign(film, { actors: '' });
    });
  }

  getFilmsList(value: string): (FilmInterface | ActorInterface)[] {
    this.onSubscribeFilmList(value);
    return this.filmListWithActors;
  }
}
