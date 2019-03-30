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

  filmList: object[] = [{
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg',
    name: 'How to Train Your Dragon: The Hidden World',
    actors: ['Jay Baruche', 'America Ferrera', 'F. Murray Abraham'],
    detail: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium minima alias earum atque beatae aperiam, eligendi laboriosam quo vero velit mollitia neque exercitationem provident accusantium voluptas aspernatur dignissimos adipisci rerum molestiae fugiat fugit. Repellendus velit praesentium quod hic cum eaque aut incidunt nobis laboriosam enim repellat, odio et ipsam pariatur possimus omnis debitis corrupti reprehenderit deleniti ratione quo. Unde quia magni temporibus omnis quis.'
  },
  {
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
    name: 'Captain Marvel',
    actors: ['Brie Larson', 'Samuel L. Jackson', 'Jude Law']
  },
  {
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/nVN7Dt0Xr78gnJepRsRLaLYklbY.jpg',
    name: 'Doom Patrol',
    actors: ['Timothy Dalton', 'Matt Bomer', 'Brendan Fraser']
  }];

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
