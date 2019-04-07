import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';
import { Observable, noop } from 'rxjs';
import { ActorInterface } from '../interfaces/actor.interface';

const params = {
  apiURL: 'https://api.themoviedb.org/3',
  apiKey: 'df56cf406d2c44e988b7705490bae759',
  page: 1
};

@Injectable({
  providedIn: 'root'
})
export class FilmService implements OnInit {
  private subscriptionOnActorList;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

  }

  createHTTPObservable(url: string) {
    return this.httpClient.get(url)
      .pipe(
        map(response => response),
        catchError((error: any) => error)
      );
  }

  getFilmList(value: string): Observable<FilmInterface[]> {
    const { apiURL, apiKey, page } = params;
    const http$ = this.createHTTPObservable(`${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`);
    const films$ = http$
      .pipe(
        map((response: any) => response.results),
        map(result => {
          result.map(res => this.getActorList(res));
          return result;
        }),
      )
    return films$;
  }

  getActorList(result): Observable<ActorInterface[]> {
    const { apiURL, apiKey } = params;
    const { id } = result;
    const http$ = this.createHTTPObservable(`${apiURL}/movie/${id}/credits?api_key=${apiKey}`);
    const actors$ = http$
      .pipe(
        map((response: ApiActorInterface) => response.cast),
        map(cast => cast.map(person => Object.assign(result, { actors: [person.name, ...result.actors] })))
      )
    this.subscribeOnActorList(actors$);
    return actors$;
  }

  subscribeOnActorList(actors$) {
    this.subscriptionOnActorList = actors$.subscribe(substream => substream);
  }

  unsubscribeActorList() {
    this.subscriptionOnActorList.unsubscribe();
  }

}
