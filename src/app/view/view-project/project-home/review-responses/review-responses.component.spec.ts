import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewResponsesComponent } from './review-responses.component';

describe('ReviewResponsesComponent', () => {
  let component: ReviewResponsesComponent;
  let fixture: ComponentFixture<ReviewResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewResponsesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
