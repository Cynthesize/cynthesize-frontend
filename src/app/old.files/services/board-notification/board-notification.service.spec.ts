import { TestBed, inject } from '@angular/core/testing';

import { BoardNotificationService } from './board-notification.service';

describe('BoardNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardNotificationService]
    });
  });

  it('should be created', inject([BoardNotificationService], (service: BoardNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
