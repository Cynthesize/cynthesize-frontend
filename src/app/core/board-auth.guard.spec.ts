import { TestBed, async, inject } from '@angular/core/testing';

import { BoardAuthGuard } from './board-auth.guard';

describe('BoardAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardAuthGuard]
    });
  });

  it('should ...', inject([BoardAuthGuard], (guard: BoardAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
