import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';
import { Observable } from 'rxjs';

const params = {
  apiURL: 'https://api.themoviedb.org/3',
  apiKey: 'df56cf406d2c44e988b7705490bae759',
  page: 1
};

@Injectable({
  providedIn: 'root'
})
export class FilmService implements OnInit {
  private subscribeOnActorList;

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

  onSubscribeFilmList(value: string): Observable<FilmInterface[]> {
    const { apiURL, apiKey, page } = params;
    const http$ = this.createHTTPObservable(`${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`);
    const films$ = http$
      .pipe(
        map((response: any) => response.results),
        map(result => {
          result.map(res=> this.onSubscribeActorList(res));
          return result;
        }),
      )
    return films$;
  }

  onSubscribeActorList(result) {
    const { apiURL, apiKey } = params;
    const http$ = this.createHTTPObservable(`${apiURL}/movie/${result.id}/credits?api_key=${apiKey}`);
    const actors$ = http$
      .pipe(
        map((actor: ApiActorInterface) => actor.cast),
        map(cast => cast.map(person => Object.assign(result, { actors: [person.name, ...result.actors] })))
      )
    this.subscribeOnActorList = actors$.subscribe(substream => substream);
    return actors$;
  }

  unsubscribeActorList() {
    this.subscribeOnActorList.unsubscribe();
  }

}
