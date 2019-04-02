import { TestBed } from '@angular/core/testing';

import { FilmService } from './film.service';

describe('FilmService', () => {
  beforeEach(() => TestBed.configureTestingModule({

  }));

  xit('should be created', () => {
    const service: FilmService = TestBed.get(FilmService);
    expect(service).toBeTruthy();
  });
});
