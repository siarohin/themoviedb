import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie';

  constructor() {

  }


  onInit() {
  }

  getInputValue(message: string) {
    this.title = message;
  }
}
