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
  private subscriberOnActorList;

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
      .pipe(map((response: any) => {
          response.results.map(result => this.onSubscribeActorList(result));
          return response.results;
        })
      );
    return films$;
  }

  onSubscribeActorList(result) {
    const { apiURL, apiKey } = params;
    this.subscriberOnActorList = this.httpClient
      .get<ApiActorInterface[]>(`${apiURL}/movie/${result.id}/credits?api_key=${apiKey}`)
        .pipe(
          catchError((error: any) => error),
          map((actor: ApiActorInterface) => {
          return actor.cast.map(person => Object.assign(result, { actors: [person.name, ...result.actors] }));
          })
        ).subscribe(substream => substream);
    return this.subscriberOnActorList;
  }

  unSubscribeActorList() {
    this.subscriberOnActorList.unsubscribe();
  }

}
