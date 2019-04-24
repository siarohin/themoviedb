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
    debounceTime,
    distinctUntilChanged
} from 'rxjs/operators';

import { Api, ApiActor, Film } from '../models/index';

import { getFilmUrl, getActorUrl } from '../utils/index';

const params = {
    resultsOnPage: 5,
    maxApiResults: 20
};

@Injectable()
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

    /**
     * get value from input
     */
    public setQuery(query: string): void {
        // init state, reset counts
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

    public getFilmList(): Observable<Array<Film>> {
        return this.querySubject.asObservable().pipe(
            debounceTime(500),
            map(value => value.trim()),
            distinctUntilChanged(),
            switchMap(query =>
                this.nextPageSubject.asObservable().pipe(
                    startWith(1),
                    switchMap(page =>
                        this.createFilmsRequest(query, page).pipe(
                            map(response => response.results),
                            mergeMap(films =>
                                this.nextDetailsPageSubject.asObservable().pipe(
                                    debounceTime(500),
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
        const http$ = this.createHTTPObservable(getFilmUrl(query, page));

        return http$;
    }

    private getFilmsDetails(
        films: Array<Api>,
        index: number
    ): Observable<Array<Film>> {
        const sliceFrom: number = index * params.resultsOnPage;
        const sliceTo: number = (index + 1) * params.resultsOnPage;

        const filmsToGetDetails: Array<any> = films.slice(sliceFrom, sliceTo);

        return from(filmsToGetDetails).pipe(
            mergeMap((film: Film) =>
                this.createHTTPObservable(getActorUrl(film)).pipe(
                    // return films with actors
                    map((actorNames: ApiActor) => {
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
