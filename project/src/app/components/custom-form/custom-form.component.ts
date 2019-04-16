import {
    Component,
    AfterViewInit,
    OnDestroy,
    Output,
    EventEmitter,
    Input,
    HostBinding,
    ViewChild,
    ElementRef
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-custom-form',
    templateUrl: './custom-form.component.html',
    styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements AfterViewInit, OnDestroy {
    private onInputKeyupSubscription: Subscription;

    @ViewChild('input')
    private input: ElementRef;

    @HostBinding('class')
    public className = 'header__input';

    @Input()
    public isActive = false;

    @Output()
    public changeInputValue: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public getInputFocus: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public getInputBlur: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public ngAfterViewInit() {
        this.onInputKeyupSubscription = fromEvent(
            this.input.nativeElement,
            'keyup'
        )
            .pipe(
                map(($event: any) => $event.target.value.trim()),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(value => {
                this.changeInputValue.emit(value);
            });
    }

    public ngOnDestroy() {
        this.onInputKeyupSubscription.unsubscribe();
    }

    public onFocus($event): void {
        this.getInputFocus.emit($event);
    }

    public onBlur($event): void {
        this.getInputBlur.emit($event);
    }
}
