import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { FilmInterface } from './interfaces/film.interface';
import { noop } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputFocusActive = false;
  selectedFilm?: FilmInterface;
  filmList?: FilmInterface[];

  constructor(private filmService: FilmService) {
  }

  onInputFocus($event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur($event: Event): void {
    this.inputFocusActive = false;
  }

  onInputChange(value: string) {
    const subscriber = this.filmService.onSubscribeFilmList(value);
    if (subscriber && value && value.length > 2) {
      const subscription = subscriber.subscribe(
        stream => {
          this.filmList = stream;
          this.selectedFilm = this.filmList[0];
        },
      noop,
        () => {
          subscription.unsubscribe();
          this.filmService.unsubscribeActorList();
        }
      );
    }
  }

  onFilmListClick($event: MouseEvent): void {
    const { id } = $event.currentTarget as HTMLInputElement;
    const filmWithDescription = this.filmList.find(film => film.id.toString() === id);
    if (filmWithDescription) {
      this.selectedFilm = filmWithDescription;
    }
  }
}
