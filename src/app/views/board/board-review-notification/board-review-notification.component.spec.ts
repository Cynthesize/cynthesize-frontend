import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardReviewNotificationComponent } from './board-review-notification.component';

describe('BoardReviewNotificationComponent', () => {
  let component: BoardReviewNotificationComponent;
  let fixture: ComponentFixture<BoardReviewNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardReviewNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardReviewNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
