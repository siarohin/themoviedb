import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map,
  catchError,
  switchMap,
  mergeMap,
  tap,
  toArray,
  concatMap,
  scan
} from 'rxjs/operators';
import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';
import { Observable, noop, Subscription, from } from 'rxjs';
import { ActorInterface } from '../interfaces/actor.interface';

const params = {
  apiURL: 'https://api.themoviedb.org/3',
  apiKey: 'df56cf406d2c44e988b7705490bae759',
  page: 1
};

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  constructor(private httpClient: HttpClient) {}

  createHTTPObservable(url: string) {
    return this.httpClient.get(url).pipe(
      map(response => response),
      catchError((error: any) => error)
    );
  }

  getFilmList(value: string): Observable<FilmInterface[]> {
    const { apiURL, apiKey, page } = params;
    // tslint:disable-next-line: max-line-length
    const http$ = this.createHTTPObservable(
      `${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`
    );
    return http$.pipe(
      map((response: any) => response.results),
      switchMap(films =>
        from(films).pipe(
          mergeMap((film: any) =>
            this.createHTTPObservable(
              `${apiURL}/movie/${film.id}/credits?api_key=${apiKey}`
            ).pipe(
              map(actorNames => {
                return Object.assign(film, { actors: [...actorNames.cast] });
              })
            )
          ),
          toArray()
        )
      )
    );
  }
}
