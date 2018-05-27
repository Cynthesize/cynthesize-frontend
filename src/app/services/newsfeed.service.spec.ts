import { TestBed, inject } from '@angular/core/testing';

import { NewsfeedService } from './newsfeed.service';

describe('NewsfeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsfeedService]
    });
  });

  it('should be created', inject([NewsfeedService], (service: NewsfeedService) => {
    expect(service).toBeTruthy();
  }));
});
