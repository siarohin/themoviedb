import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const params = {
  apiURL: 'https://api.themoviedb.org/3/search/',
  imgURL: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2',
  apiKey: 'df56cf406d2c44e988b7705490bae759',
  language: 'en-US',
  page: 1,
  adult: false,
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  constructor(private httpClient: HttpClient) { }

  getURL(value: string): string {
    const { apiURL, apiKey, language, page, adult } = params;
    return `${apiURL}movie?api_key=${apiKey}&language=${language}&query=${value}&page=${page}&include_adult=${adult}`;
  }

  getFilmList(value: string) {
    return this.httpClient
      .get(this.getURL(value))
      .pipe(map(res => res.results))
      .pipe(map(films => {
        return films.map(film => {
          return {
            'id': `${film.id}`,
            'name': film.original_title,
            'imgURL': film.poster_path ? `${params.imgURL}${film.poster_path}` : '../assets/images/empty.png',
            'vote': film.vote_average,
            'release': film.release_date,
            'overview': film.overview,
          }
        })
      }))
  }
}
