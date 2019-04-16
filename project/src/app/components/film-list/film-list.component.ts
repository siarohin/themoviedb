import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input,
    HostBinding,
    Output,
    ViewChild,
    EventEmitter,
    ElementRef
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { FilmInterface } from '../../interfaces/film.interface';

@Component({
    selector: 'app-film-list',
    templateUrl: './film-list.component.html',
    styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements AfterViewInit, OnDestroy {
    private onButtonPressSubscription: Subscription;

    /**
     * add class to <app-film-list /> component
     */
    @HostBinding('class')
    public className = 'main__film-list';

    /**
     * Element Ref
     * get button from template
     */
    @ViewChild('btn')
    public btn: ElementRef;

    /**
     * get film`s array from App component
     * render <li /> with films in template
     */
    @Input()
    public films: FilmInterface[];

    /**
     * binding new event from click on <li /> with film
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onFilmClick: EventEmitter<string> = new EventEmitter<string>();

    /**
     * binding new event from click on <button /> Next
     * using by controller in App component
     */
    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onButtonClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    /**
     * subscription for button`s click event
     */
    public ngAfterViewInit() {
        this.onButtonPressSubscription = fromEvent(
            this.btn.nativeElement,
            'click'
        )
            // binding click from 1s
            .pipe(debounceTime(1000))
            .subscribe(() => {
                this.onButtonClick.emit();
            });
    }

    /**
     * unsubscribe from button`s click event
     */
    public ngOnDestroy() {
        this.onButtonPressSubscription.unsubscribe();
    }

    /**
     * emit event on click <li /> with film
     */
    public onClick(event): void {
        this.onFilmClick.emit(event);
    }
}
