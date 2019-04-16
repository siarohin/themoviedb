import {
    Component,
    AfterViewInit,
    OnDestroy,
    Output,
    EventEmitter,
    Input,
    HostBinding,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-custom-form',
    templateUrl: './custom-form.component.html',
    styleUrls: ['./custom-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormComponent implements AfterViewInit, OnDestroy {
    private onInputKeyupSubscription: Subscription;

    /**
     * Element Ref
     * get input form from template
     */
    @ViewChild('input')
    private input: ElementRef;

    /**
     * add class to <app-custom-form /> component
     */
    @HostBinding('class')
    public className = 'header__input';

    /**
     * get param from App component
     * using to change classList of input
     */
    @Input()
    public isActive = false;

    /**
     * emit new event on input change
     * send to controller in App component
     */
    @Output()
    public changeInputValue: EventEmitter<string> = new EventEmitter<string>();

    /**
     * emit new event on input focus
     * send to controller in App component
     */
    @Output()
    public getInputFocus: EventEmitter<string> = new EventEmitter<string>();

    /**
     * emit new event on input focus out
     * send to controller in App component
     */
    @Output()
    public getInputBlur: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    /**
     * subscription for keyUp event
     * get input`s value
     */
    public ngAfterViewInit(): void {
        this.onInputKeyupSubscription = fromEvent(
            this.input.nativeElement,
            'keyup'
        )
            .pipe(
                // trim tabs from begin and end
                map(($event: any) => $event.target.value.trim()),
                // emit from 1s
                debounceTime(1000),
                // emit only new value
                distinctUntilChanged()
            )
            .subscribe(value => {
                this.changeInputValue.emit(value);
            });
    }

    /**
     * unsubscribe for keyUp event
     */
    public ngOnDestroy(): void {
        this.onInputKeyupSubscription.unsubscribe();
    }

    /**
     * emit focus on event from input form
     * using by controller from App component
     */
    public onFocus($event): void {
        this.getInputFocus.emit($event);
    }

    /**
     * emit focus off event from input form
     * using by controller from App component
     */
    public onBlur($event): void {
        this.getInputBlur.emit($event);
    }
}
