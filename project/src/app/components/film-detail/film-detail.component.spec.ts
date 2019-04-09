import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailComponent } from './film-detail.component';
import { By } from '@angular/platform-browser';


describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;
  let debugElement;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has className=`main__film-detail`', () => {
    expect(component.className).toContain('main__film-detail');
  });

  it('shouldnt has property `films` on init', () => {
    expect(component.film).toBeFalsy();
  });

  it('shouldnt render template on init', () => {
    const article = debugElement.query(By.css('article'));
    const title = debugElement.query(By.css('h1'));
    const div = debugElement.query(By.css('div'));
    const ul = debugElement.query(By.css('ul'));
    expect(article).toBeNull();
    expect(title).toBeNull();
    expect(div).toBeNull();
    expect(ul).toBeNull();
  });

  it('should render template after receive `films` and elements should have classList', () => {
    component.film = {
        actors: ['John'],
        id: 913516,
        original_title: 'Marvel Film',
        title: 'Marvel',
        adult: false,
        backdrop_path: 'img url',
        genre_ids: [1, 2],
        original_language: 'ru',
        overview: 'Lorem ipsum',
        popularity: 89,
        poster_path: 'img url',
        release_date: '11-20-19',
        video: false,
        vote_average: 18,
        vote_count: 91,
      };
    fixture.detectChanges();

    let article = debugElement.query(By.css('article'));
    let title = debugElement.query(By.css('h1'));
    let div = debugElement.query(By.css('div'));
    let ul = debugElement.query(By.css('ul'));
    let li = debugElement.query(By.css('li'));
    expect(article).toBeDefined();
    expect(title).toBeDefined();
    expect(div).toBeDefined();
    expect(ul).toBeDefined();
    expect(li).toBeDefined();

    article = article.nativeElement;
    title = title.nativeElement;
    div = div.nativeElement;
    ul = ul.nativeElement;
    li = li.nativeElement;
    expect(article.className).toContain('film__overview');
    expect(title.className).toContain('film__title');
    expect(div.className).toContain('film__image wrapper');
    expect(ul.className).toContain('actors-data actors');
    expect(li.className).toContain('actors-item');
  });

  it('shouldnt add actors in template on empty actorList', () => {
    component.film = {
        actors: [],
        id: 913516,
        original_title: 'Marvel Film',
        title: 'Marvel',
        adult: false,
        backdrop_path: 'img url',
        genre_ids: [1, 2],
        original_language: 'ru',
        overview: 'Lorem ipsum',
        popularity: 89,
        poster_path: 'img url',
        release_date: '11-20-19',
        video: false,
        vote_average: 18,
        vote_count: 91,
      };
    fixture.detectChanges();
    const li = debugElement.query(By.css('li'));
    expect(li).toBeNull();
  });

  it('should add all films to template', () => {
    component.film = {
        actors: ['John', 'Doll'],
        id: 913516,
        original_title: 'Marvel Film',
        title: 'Marvel',
        adult: false,
        backdrop_path: '/img.jpg',
        genre_ids: [1, 2],
        original_language: 'ru',
        overview: 'Lorem ipsum',
        popularity: 89,
        poster_path: '/img.jpg',
        release_date: '11-20-19',
        video: false,
        vote_average: 18,
        vote_count: 91,
      };
    fixture.detectChanges();
    const article = debugElement.query(By.css('article')).nativeElement;
    const title = debugElement.query(By.css('h1')).nativeElement;
    const img = debugElement.query(By.css('img')).nativeElement;
    const li = debugElement.queryAll(By.css('li'));
    expect(article.innerText).toBe('Lorem ipsum');
    expect(title.innerText).toBe('Marvel Film');
    expect(img.src).toBe('https://image.tmdb.org/t/p/w600_and_h900_bestv2/img.jpg');
    expect(li[0].nativeElement.innerText).toBe('John');
    expect(li[1].nativeElement.innerText).toBe('Doll');

  });

});
