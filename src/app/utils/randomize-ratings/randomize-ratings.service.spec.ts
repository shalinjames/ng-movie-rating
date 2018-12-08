import { TestBed } from '@angular/core/testing';

import { RandomizeRatingsService } from './randomize-ratings.service';

describe('RandomizeRatingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomizeRatingsService = TestBed.get(RandomizeRatingsService);
    expect(service).toBeTruthy();
  });
});
