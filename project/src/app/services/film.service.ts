import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiInterface } from '../interfaces/api.interface';

const params = {
  apiURL: 'https://api.themoviedb.org/3',
  apiKey: 'df56cf406d2c44e988b7705490bae759',
  page: 1
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  constructor(private httpClient: HttpClient) { }

  getActorList(value: string) {
    const { apiURL } = params;
    return this.httpClient
      .get(`${apiURL}/movie/${value}/credits?api_key=${params.apiKey}`)
      .pipe(map(res => res)) // TODO Add Inerface
      .pipe(map(res => res.cast))
  }

  getFilmList(value: string) {
    const { apiURL, apiKey, page } = params;
    return this.httpClient
      .get(`${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
      .pipe(map(res => res as ApiInterface))
      .pipe(map(res => res.results))
  }
}
