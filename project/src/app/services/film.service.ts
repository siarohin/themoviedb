import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';
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
  list;

  constructor(private httpClient: HttpClient) { }

  onSubscribeFilmList(value: string) {
    if (value.length > 2) {
      const { apiURL, apiKey, page } = params;
      return this.httpClient
        .get<ApiInterface>(`${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
          .pipe(
            map(response => {
              response.results.map(result => {
                this.httpClient.get<ApiActorInterface>(`${apiURL}/movie/${result.id}/credits?api_key=${params.apiKey}`)
                  .pipe(map(actor => {
                    return actor.cast.map(person => Object.assign(result, { actors: [person.name, ...result.actors] }));
                  }))
                  .subscribe(substream => substream);
              });
              return response.results;
            })
          ).subscribe(stream => {
            this.list = stream;
            console.log(this.list);
            return this.list;
          });
    }
  }

}
