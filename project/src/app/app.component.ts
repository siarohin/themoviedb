import { Component, OnInit, Input, AfterViewChecked, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'Movie';
  value: string;
  inputFocusActive: boolean = false;

  constructor() {

  }


  onInit() {
  }

  ngAfterViewChecked() {

  }

  onInputFocus(event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur(event: Event): void {
    this.inputFocusActive = false;
  }

  getInputValue(inputValue: string): void {
    this.value = inputValue;
  }
}
