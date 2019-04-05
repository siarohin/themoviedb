import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FilmService } from './film.service';

describe('FilmService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [HttpClientTestingModule],
    providers: [
      FilmService
    ]
  }));

  it('should be created', () => {
    const service: FilmService = TestBed.get(FilmService);
    expect(service).toBeTruthy();
  });

});
