import { Component, OnInit, Input, AfterViewChecked, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'Movie';
  value: string;

  constructor() {

  }


  onInit() {
  }

  ngAfterViewChecked() {

  }


  getInputValue(inputValue: string): void {
    this.value = inputValue;
  }
}
