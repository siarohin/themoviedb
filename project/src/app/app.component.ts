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
  title = 'Movie';

  constructor(private filmService: FilmService) {
  }

  onInputFocus($event: Event): void {
    this.inputFocusActive = true;
  }

  onInputBlur($event: Event): void {
    this.inputFocusActive = false;
  }

  onInputChange(value: string) {
    if (value && value.length > 2) {
      const subscriptionOnFilmList = this.filmService.getFilmList(value).subscribe(
        stream => {
          this.filmList = stream;
          this.selectedFilm = this.filmList[0];
        },
        noop,
        () => {
          subscriptionOnFilmList.unsubscribe();
          this.filmService.unsubscribeFromActors();
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
