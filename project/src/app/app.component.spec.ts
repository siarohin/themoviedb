import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { FilmService } from './services/film.service';

import { of } from 'rxjs';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement;
    let app;
    let filmService: FilmService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [
                AppComponent,
                CustomFormComponent,
                FilmListComponent,
                FilmDetailComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        app = debugElement.componentInstance;
        filmService = debugElement.injector.get(FilmService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(app).toBeTruthy();
    });

    it(`should have a title`, () => {
        expect(app.title).toEqual('Movie');
    });

    it('should render title in a h1 tag', () => {
        const compiled = debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain(app.title);
    });

    it(`should have 'onInputFocus', 'onInputBlur', 'onInputChange'`, () => {
        expect(app.onInputFocus).toBeDefined();
        expect(app.onInputBlur).toBeDefined();
        expect(app.onInputChange).toBeDefined();
    });

    it(`should have a property 'inputFocusActive' to be false`, () => {
        expect(app.inputFocusActive).toBeDefined();
        expect(app.inputFocusActive).toBeFalsy();
    });

    it(`method 'onInputFocus' should change a property 'inputFocusActive' to be true`, () => {
        app.inputFocusActive = false;
        app.onInputFocus();
        expect(app.inputFocusActive).toBeTruthy();
    });

    it(`method 'onInputBlur' should change a property 'inputFocusActive' to be false`, () => {
        app.inputFocusActive = true;
        app.onInputBlur();
        expect(app.inputFocusActive).toBeFalsy();
    });

    it(`shouldn't have a properties 'filmList', 'selectedFilm' on init`, () => {
        expect(app.filmList).toBeUndefined();
        expect(app.selectedFilm).toBeUndefined();
    });

    it(`shouldn't draw 'main' container on init`, () => {
        expect(debugElement.query(By.css('main'))).toBeFalsy();
    });

    it(`should draw 'input form' container on init`, () => {
        expect(debugElement.query(By.css('input'))).toBeTruthy();
    });

    it(`should draw 'input', main' container after reseived filmList`, () => {
        app.filmList = [
            {
                actors: ['John'],
                id: 913516,
                original_title: 'Marvel Film',
                title: 'Marvel'
            }
        ];
        fixture.detectChanges();
        expect(debugElement.query(By.css('input'))).toBeTruthy();
        expect(debugElement.query(By.css('main'))).toBeTruthy();
    });

    it(`should callFake getFilmList method 1 times`, () => {
        const filmList = [
            {
                actors: ['John'],
                id: 913516,
                original_title: 'Marvel Film',
                title: 'Marvel'
            }
        ];
        const spy = spyOn(filmService, 'getFilmList').and.callFake(() =>
            of(filmList)
        );
        app.onInputChange('marvel');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it(`should set property 'filmList' after call 'onInputChange' method`, () => {
        const filmList = [
            {
                actors: ['John'],
                id: 913516,
                original_title: 'Marvel Film',
                title: 'Marvel'
            }
        ];
        spyOn(filmService, 'getFilmList').and.callFake(() => of(filmList));
        app.onInputChange('marvel');
        expect(app.filmList).toEqual(filmList);
    });

    it(`should set property 'selectedFilm' = 'filmList[0]' after call 'onInputChange' method`, () => {
        const filmList = [
            {
                actors: ['John'],
                id: 913516,
                original_title: 'Marvel Film',
                title: 'Marvel'
            },
            {
                actors: ['John Dall'],
                id: 913517,
                original_title: 'Marvel Document',
                title: 'Document'
            }
        ];
        spyOn(filmService, 'getFilmList').and.callFake(() => of(filmList));
        app.onInputChange('marvel');
        expect(app.selectedFilm).toEqual(filmList[0]);
    });
});
