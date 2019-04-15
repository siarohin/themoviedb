import {
    Component,
    OnInit,
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
export class FilmListComponent implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('class') className = 'main__film-list';

    onButtonPressSubscription: Subscription;

    @ViewChild('btn')
    btn: ElementRef;

    @Input()
    films: FilmInterface[];

    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    onFilmClick: EventEmitter<string> = new EventEmitter<string>();

    // tslint:disable-next-line: no-output-on-prefix
    @Output()
    onButtonClick: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.onButtonPressSubscription = fromEvent(
            this.btn.nativeElement,
            'click'
        )
            .pipe(
                debounceTime(1000)
            )
            .subscribe(() => {
                this.onButtonClick.emit();
            });
    }

    ngOnDestroy() {
        this.onButtonPressSubscription.unsubscribe();
    }

    onClick(event): void {
        this.onFilmClick.emit(event);
    }
}
