import {
        Component,
        OnInit,
        AfterViewInit,
        OnDestroy,
        Output,
        EventEmitter,
        Input,
        HostBinding,
        ViewChild,
        ElementRef
      } from '@angular/core';

import { fromEvent, Observable, Subscription, ObservableInput } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') className = 'header__input';

  @ViewChild('input')
  input: ElementRef;

  @Input()
  isActive = false;

  @Output()
  changeInputValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getInputFocus: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getInputBlur: EventEmitter<string> = new EventEmitter<string>();

  onInputKeyupSubscription: Subscription;


  constructor() { }


  ngOnInit() {

  }

  ngAfterViewInit() {
    this.onInputKeyupSubscription = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map(($event: any) => $event.target.value.trim()),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.changeInputValue.emit(value);
      });
  }

  ngOnDestroy() {
    this.onInputKeyupSubscription.unsubscribe();
  }

  onFocus($event): void {
    this.getInputFocus.emit($event);
  }

  onBlur($event): void {
    this.getInputBlur.emit($event);
  }

}
