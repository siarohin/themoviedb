import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, from, Subject, combineLatest } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
    mergeMap,
    toArray,
    take,
    skip,
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
    private filmList: FilmInterface[];
    private count = 0;
    private page = 1;
    private value: string;
    private newRequest = false;
    private httpClient: HttpClient;

    private querySubject: Subject<string> = new Subject();
    private nextDetailsPageSubject: Subject<any> = new Subject();
    private nextPageSubject: Subject<number> = new Subject();
    private currentDetailsPage: number;
    private currentPage: number;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * method compare prev and new value and return boolean (true | false)
     * if new Request --> true
     * if not new Request --> false
     */
    public isNewRequest(value?): boolean {
        this.value === value
            ? (this.newRequest = false)
            : (this.newRequest = true);
        return this.newRequest;
    }

    /**
     * method return existing value
     * using in App component, when  we click on Button
     */
    public getValue() {
        return this.value;
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

    /**
     * api contoller
     */
    public getFilmList() {
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
                                        this.getFilsmDetails(films, index)
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

    private createFilmsRequest(query: string, page: number): Observable<any> {
        const { apiURL, apiKey } = params;
        const http$ = this.createHTTPObservable(
            `${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
        );

        return http$;
    }

    private getFilsmDetails(films: Array<any>, index: number): any {
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

    /**
     * 1st Api: return new filmList array (with 20 films)
     */
    public addNewFilmList(value: string): Observable<FilmInterface[]> {
        const { apiURL, apiKey } = params;
        const http$ = this.createHTTPObservable(
            `${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${value}&page=${
                this.page
            }&include_adult=false`
        );
        return http$.pipe(
            map((response: ApiInterface) => {
                // return 20 films without actors
                return (this.filmList = response.results);
            }),
            // switch to 2st Api and get actors
            switchMap(() => this.searchFromFilmList())
        );
    }

    /**
     * 2st Api: get this.filmList array, slice 5 films and return films with actors
     */
    public searchFromFilmList() {
        const { apiURL, apiKey, resultsOnPage } = params;
        from(this.filmList).pipe(
            // slice 5 films
            skip(this.count),
            take(resultsOnPage),
            // send req to Api
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

    private createHTTPObservable(url: string) {
        return this.httpClient.get(url).pipe(
            map(response => response),
            catchError((error: any) => error)
        );
    }

    /**
     * max count from Api = 20 (params.maxApiResults)
     * method is reset count of films, when it > 20
     */
    private resetCount() {
        this.count = 0;
    }

    /**
     * method add +5 to count of films
     * using when we click on 'Next' button
     */
    private incrementCount() {
        const { resultsOnPage } = params;
        this.count += resultsOnPage;
    }

    /**
     * method reset page to 1, when we send new request (with new value)
     * using in this.getFilmList
     */
    private resetPage() {
        this.page = 1;
    }

    /**
     * method increment page +1, when we click on 'Next' button and count > 20
     */
    private incrementPage() {
        this.page += 1;
    }
}
