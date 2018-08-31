import { TestBed, inject } from '@angular/core/testing';

import { BoardAuthService } from './board-auth.service';

describe('BoardAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardAuthService]
    });
  });

  it('should be created', inject([BoardAuthService], (service: BoardAuthService) => {
    expect(service).toBeTruthy();
  }));
});
