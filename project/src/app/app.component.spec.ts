import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmService } from './services/film.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        CustomFormComponent,
        FilmListComponent,
        FilmDetailComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Movie'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.title).toEqual('Movie');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Movie');
  });

  it(`should have a methods 'onInputFocus', 'onInputBlur', 'onInputChange'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.onInputFocus).toBeDefined();
    expect(app.onInputBlur).toBeDefined();
    expect(app.onInputChange).toBeDefined();
  });

  it(`should have a property 'inputFocusActive' to be false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.inputFocusActive).toBeDefined();
    expect(app.inputFocusActive).toBeFalsy();
  });

  it(`method 'onInputFocus' should change a property 'inputFocusActive' to be true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.inputFocusActive = false;
    app.onInputFocus();
    expect(app.inputFocusActive).toBeTruthy();
  });

  it(`method 'onInputBlur' should change a property 'inputFocusActive' to be false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.inputFocusActive = true;
    app.onInputBlur();
    expect(app.inputFocusActive).toBeFalsy();
  });

  it(`shouldn't have a properties 'filmList', selectedFilm' on init`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.filmList).toBeUndefined();
    expect(app.selectedFilm).toBeUndefined();
  });

  it(`shouldn't draw 'main' container on init`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('main')).toBeFalsy();
  });

  it(`should draw 'input form' container on init`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it(`should draw 'input', main' container after reseived filmList`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.filmList = [{
      actors: ['John'],
      id: 913516,
      original_title: 'Marvel Film',
      title: 'Marvel',
    }];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
    expect(compiled.querySelector('main')).toBeTruthy();
  });

  it(`should callFake getFilmList method 1 times`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const filmService = fixture.debugElement.injector.get(FilmService);
    const filmList = [{
      actors: ['John'],
      id: 913516,
      original_title: 'Marvel Film',
      title: 'Marvel',
    }];
    const spy = spyOn(filmService, 'getFilmList').and.callFake(() => of(filmList));
    spyOn(filmService, 'unsubscribeFromActors');
    app.onInputChange('marvel');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should set property 'filmList' after call 'onInputChange' method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const filmService = fixture.debugElement.injector.get(FilmService);
    const filmList = [{
      actors: ['John'],
      id: 913516,
      original_title: 'Marvel Film',
      title: 'Marvel',
    }];
    const spy = spyOn(filmService, 'getFilmList').and.callFake(() => of(filmList));
    spyOn(filmService, 'unsubscribeFromActors');
    app.onInputChange('marvel');
    expect(app.filmList).toEqual(filmList);
  });

  it(`should set property 'selectedFilm' = 'filmList[0]' after call 'onInputChange' method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const filmService = fixture.debugElement.injector.get(FilmService);
    const filmList = [{
      actors: ['John'],
      id: 913516,
      original_title: 'Marvel Film',
      title: 'Marvel',
    }];
    const spy = spyOn(filmService, 'getFilmList').and.callFake(() => of(filmList));
    spyOn(filmService, 'unsubscribeFromActors');
    app.onInputChange('marvel');
    expect(app.selectedFilm).toEqual(filmList[0]);
  });


});
