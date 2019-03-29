import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {

  @Output()
  userValue: string;

  @Output()
  input: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onInputChange(value: string) {
    return this.userValue = value;
  }

}
