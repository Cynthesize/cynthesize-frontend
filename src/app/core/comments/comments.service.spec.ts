import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentsService = TestBed.get(CommentsService);
    expect(service).toBeTruthy();
  });
});
