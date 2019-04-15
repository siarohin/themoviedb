import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    map,
    catchError,
    switchMap,
    mergeMap,
    toArray,
    tap,
    take,
    skip
} from 'rxjs/operators';
import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';
import { Observable, from } from 'rxjs';

export const params = {
    apiURL: 'https://api.themoviedb.org/3',
    apiKey: 'df56cf406d2c44e988b7705490bae759',
    resultsOnPage: 5,
    maxApiResults: 20
};

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    private filmList: FilmInterface[];
    private count = 0;
    private page = 1;
    private totalResults: number;
    private value: string;
    private newRequest = false;

    constructor(private httpClient: HttpClient) {}

    createHTTPObservable(url: string) {
        return this.httpClient.get(url).pipe(
            map(response => response),
            catchError((error: any) => error)
        );
    }

    resetCount() {
        this.count = 0;
    }

    incrementCount() {
        const { resultsOnPage } = params;
        this.count += resultsOnPage;
    }

    getCount() {
        return this.count;
    }

    resetPage() {
        this.page = 1;
    }

    incrementPage() {
        this.page += 1;
    }

    isNewRequest(value?): boolean {
        this.value === value ? (this.newRequest = false) : (this.newRequest = true);
        return this.newRequest;
    }

    getValue() {
        return this.value;
    }

    getFilmList(value: string) {
        this.isNewRequest(value);
        if (this.newRequest) {
            this.resetCount();
            this.resetPage();
            this.value = value;
            return this.addNewFilmList(value);
        }
        else {
            this.incrementCount();
            const { maxApiResults } = params;
                if (this.count < maxApiResults) {
                    return this.searchFromFilmList();
                } else {
                    this.resetCount();
                    this.incrementPage();
                    return this.addNewFilmList(this.value);
            }
        }
    }

    addNewFilmList(value: string): Observable<FilmInterface[]> {
        const { apiURL, apiKey } = params;
        const http$ = this.createHTTPObservable(
            `${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${
                this.page
            }&include_adult=false`
        );
        return http$.pipe(
            map((response: ApiInterface) => {
                this.totalResults = response.total_results;
                return (this.filmList = response.results);
            }),
            switchMap(() => this.searchFromFilmList())
        );
    }

    searchFromFilmList() {
        const { apiURL, apiKey, resultsOnPage } = params;
        return from(this.filmList).pipe(
            skip(this.count),
            take(resultsOnPage),
            mergeMap((film: FilmInterface) =>
                this.createHTTPObservable(
                    `${apiURL}/movie/${film.id}/credits?api_key=${apiKey}`
                ).pipe(
                    map((actorNames: ApiActorInterface) => {
                        return Object.assign(film, {
                            actors: [...actorNames.cast]
                        });
                    }),
                    tap(console.log)
                )
            ),
            toArray()
        );
    }
}
