import { TestBed, inject } from '@angular/core/testing';

import { TextualDetailsService } from './textual-details.service';

describe('TextualDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextualDetailsService]
    });
  });

  it('should be created', inject([TextualDetailsService], (service: TextualDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
