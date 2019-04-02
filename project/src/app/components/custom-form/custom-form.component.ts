import { Component, OnInit, Output, EventEmitter, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  @HostBinding('class') className = 'header__input';

  @Input()
  isActive = false;

  @Output()
  changeInputValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getInputFocus: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getInputBlur: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }


  ngOnInit() {
  }

  onKeyUp($event): void {
    this.changeInputValue.emit($event);
  }

  onFocus($event): void {
    this.getInputFocus.emit($event);
  }

  onBlur($event): void {
    this.getInputBlur.emit($event);
  }

}
