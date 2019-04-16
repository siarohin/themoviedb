import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, from, Subject } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
    mergeMap,
    toArray,
    startWith,
    scan,
    debounceTime
} from 'rxjs/operators';

import { ApiInterface, ApiActorInterface } from '../interfaces/api.interface';
import { FilmInterface } from '../interfaces/film.interface';

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
    private httpClient: HttpClient;
    private querySubject: Subject<string> = new Subject();
    private nextDetailsPageSubject: Subject<any> = new Subject();
    private nextPageSubject: Subject<number> = new Subject();
    private currentDetailsPage: number;
    private currentPage: number;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public setQuery(query: string): void {
        this.currentDetailsPage = 0;
        this.currentPage = 1;
        this.querySubject.next(query);
    }

    public setPage(): void {
        if (
            this.currentDetailsPage >=
            params.maxApiResults / params.resultsOnPage
        ) {
            this.currentDetailsPage = 0;
            this.currentPage += 1;
            this.nextPageSubject.next(this.currentPage);
        } else {
            this.currentDetailsPage += 1;
            this.nextDetailsPageSubject.next(this.currentDetailsPage);
        }
    }

    public getFilmList(): Observable<Array<FilmInterface>> {
        return this.querySubject.asObservable().pipe(
            debounceTime(1000),
            switchMap(query =>
                this.nextPageSubject.asObservable().pipe(
                    startWith(1),
                    switchMap(page =>
                        this.createFilmsRequest(query, page).pipe(
                            map(response => response.results),
                            mergeMap(films =>
                                this.nextDetailsPageSubject.asObservable().pipe(
                                    debounceTime(1000),
                                    startWith(0),
                                    switchMap(index =>
                                        this.getFilmsDetails(films, index)
                                    )
                                )
                            )
                        )
                    ),
                    scan(
                        (filmsList, filmsWithDetails) => [
                            ...filmsList,
                            ...filmsWithDetails
                        ],
                        []
                    )
                )
            )
        );
    }

    private createHTTPObservable(url: string) {
        return this.httpClient.get(url).pipe(
            map(response => response),
            catchError((error: any) => error)
        );
    }

    private createFilmsRequest(query: string, page: number): Observable<any> {
        const { apiURL, apiKey } = params;
        const http$ = this.createHTTPObservable(
            `${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
        );

        return http$;
    }

    private getFilmsDetails(
        films: Array<ApiInterface>,
        index: number
    ): Observable<Array<FilmInterface>> {
        const { apiURL, apiKey } = params;
        const sliceFrom: number = index * params.resultsOnPage;
        const sliceTo: number = (index + 1) * params.resultsOnPage;

        const filmsToGetDetails: Array<any> = films.slice(sliceFrom, sliceTo);

        return from(filmsToGetDetails).pipe(
            mergeMap((film: FilmInterface) =>
                this.createHTTPObservable(
                    `${apiURL}/movie/${film.id}/credits?api_key=${apiKey}`
                ).pipe(
                    // return films with actors
                    map((actorNames: ApiActorInterface) => {
                        return Object.assign(film, {
                            actors: [...actorNames.cast]
                        });
                    })
                )
            ),
            toArray()
        );
    }
}
