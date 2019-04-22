import {
    Component,
    Output,
    EventEmitter,
    Input,
    HostBinding,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'app-custom-form',
    templateUrl: './custom-form.component.html',
    styleUrls: ['./custom-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormComponent {
    @HostBinding('class.active') public active: boolean;

    /**
     * get param from App component
     * using to change classList of input
     */
    @Input()
    public set isActive(value: boolean) {
        this.active = value;
    }

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
     * emit keyUp event from input form
     * using by controler from App component
     */
    public onChange($event): void {
        const { value } = $event.target as HTMLInputElement;
        this.changeInputValue.emit(value);
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
