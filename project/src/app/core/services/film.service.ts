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

import {
    GetFilmsResponse,
    GetFilmsDetailsResponse,
    Film
} from '../models/index';
import { getFilmUrl, getActorUrl } from '../utils/index';
import {
    ScheduleStoreService,
    WatchedListStoreService
} from '../store-facades/index';

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
    private filmsToWatch$: Observable<ReadonlyArray<Film>>;
    private watchedFilms$: Observable<ReadonlyArray<Film>>;
    private scheduleStoreService: ScheduleStoreService;
    private watchedListStoreService: WatchedListStoreService;

    constructor(
        httpClient: HttpClient,
        scheduleStoreService: ScheduleStoreService,
        watchedListStoreService: WatchedListStoreService
    ) {
        this.httpClient = httpClient;
        this.scheduleStoreService = scheduleStoreService;
        this.watchedListStoreService = watchedListStoreService;
        this.filmsToWatch$ = this.scheduleStoreService.getFilmsToWatch();
        this.watchedFilms$ = this.watchedListStoreService.getWatchedFilms();
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

    /**
     * set page
     */
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
     * get filmList
     */
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
                    ),
                    switchMap(filmList => this.getFilmsToWatch(filmList)),
                    switchMap(filmList => this.getWatchedFilms(filmList))
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
        films: Array<GetFilmsResponse>,
        index: number
    ): Observable<Array<Film>> {
        const sliceFrom: number = index * params.resultsOnPage;
        const sliceTo: number = (index + 1) * params.resultsOnPage;

        const filmsToGetDetails: Array<any> = films.slice(sliceFrom, sliceTo);

        return from(filmsToGetDetails).pipe(
            mergeMap((film: Film) =>
                this.createHTTPObservable(getActorUrl(film)).pipe(
                    // return films with actors
                    map((actorNames: GetFilmsDetailsResponse) => {
                        return Object.assign(film, {
                            actors: [...actorNames.cast]
                        });
                    })
                )
            ),
            toArray()
        );
    }

    private getFilmsToWatch(filmList) {
        return this.filmsToWatch$.pipe(
            map(filmsToWatch =>
                filmList.map(film => {
                    const indexFilmToWatch: number = filmsToWatch.findIndex(
                        filmToWatch => filmToWatch.id === film.id
                    );
                    if (indexFilmToWatch !== -1) {
                        film.inListToWatch = true;
                    }
                    return film;
                })
            )
        );
    }

    private getWatchedFilms(filmList) {
        return this.watchedFilms$.pipe(
            map(watchedFilms =>
                filmList.map(film => {
                    const indexWatchedFilm: number = watchedFilms.findIndex(
                        watchedFilm => watchedFilm.id === film.id
                    );
                    if (indexWatchedFilm !== -1) {
                        film.inWatchedList = true;
                    }
                    return film;
                })
            )
        );
    }
}
