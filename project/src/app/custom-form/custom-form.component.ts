import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  @Input()
  isActive: boolean;

  @Output()
  changeInputValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getInputFocus: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getInputBlur: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }


  ngOnInit() {
  }

  onKeyUp(event): void {
    this.changeInputValue.emit(event.target.value);
  }

  onInputFocus(event): void {
    this.getInputFocus.emit(event);
  }

  onInputBlur(event): void {
    this.getInputBlur.emit(event);
  }

}
