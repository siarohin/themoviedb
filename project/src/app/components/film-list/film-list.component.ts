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

    @ViewChild('btn')
    private btn: ElementRef;

    @HostBinding('class')
    public className = 'main__film-list';

    @Input()
    public films: FilmInterface[];

    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onFilmClick: EventEmitter<string> = new EventEmitter<string>();

    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    public onButtonClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public ngAfterViewInit() {
        this.onButtonPressSubscription = fromEvent(
            this.btn.nativeElement,
            'click'
        )
            .pipe(debounceTime(1000))
            .subscribe(() => {
                this.onButtonClick.emit();
            });
    }

    public ngOnDestroy() {
        this.onButtonPressSubscription.unsubscribe();
    }

    public onClick(event): void {
        this.onFilmClick.emit(event);
    }
}
