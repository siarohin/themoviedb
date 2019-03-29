import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'Movie';
  value = '';

  constructor() {

  }


  onInit() {
  }

  ngAfterViewChecked() {

  }

  getInputValue(message: string) {
    this.title = message;
  }
}
