import { TestBed, inject } from '@angular/core/testing';

import { ProjectDetailService } from './project-detail.service';

describe('ProjectDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDetailService]
    });
  });

  it('should be created', inject([ProjectDetailService], (service: ProjectDetailService) => {
    expect(service).toBeTruthy();
  }));
});
