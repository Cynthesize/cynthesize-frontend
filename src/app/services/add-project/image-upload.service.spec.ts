import { TestBed, inject } from '@angular/core/testing';

import { ImageUploadService } from './image-upload.service';

describe('ImageUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageUploadService]
    });
  });

  it('should be created', inject([ImageUploadService], (service: ImageUploadService) => {
    expect(service).toBeTruthy();
  }));
});
