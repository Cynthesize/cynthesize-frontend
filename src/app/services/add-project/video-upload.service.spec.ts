import { TestBed, inject } from '@angular/core/testing';

import { VideoUploadService } from './video-upload.service';

describe('VideoUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoUploadService]
    });
  });

  it('should be created', inject([VideoUploadService], (service: VideoUploadService) => {
    expect(service).toBeTruthy();
  }));
});
