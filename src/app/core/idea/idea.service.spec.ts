import { TestBed } from '@angular/core/testing';

import { IdeaService } from './idea.service';

describe('IdeaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdeaService = TestBed.get(IdeaService);
    expect(service).toBeTruthy();
  });
});
