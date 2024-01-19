/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpisodioService } from './episodio.service';

describe('Service: Episodio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpisodioService]
    });
  });

  it('should ...', inject([EpisodioService], (service: EpisodioService) => {
    expect(service).toBeTruthy();
  }));
});
