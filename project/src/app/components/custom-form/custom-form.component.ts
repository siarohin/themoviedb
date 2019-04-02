import { Component, OnInit, Output, EventEmitter, Input, HostBinding, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit, AfterViewInit {
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

  observerByInput;


  constructor() { }


  ngOnInit() {

  }

  ngAfterViewInit() {
    const observableInput = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map(($event: any) => $event.target.value),
        debounceTime(500),
        distinctUntilChanged());
    this.observerByInput = observableInput.subscribe((value: string) => this.onKeyUp(value));
  }

  ngOnDestroy() {
    this.observerByInput.unsubscribe();
  }

  onKeyUp(value): void {
    this.changeInputValue.emit(value);
  }

  onFocus($event): void {
    this.getInputFocus.emit($event);
  }

  onBlur($event): void {
    this.getInputBlur.emit($event);
  }

}
