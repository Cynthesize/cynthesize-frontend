import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAnswersComponent } from './review-answers.component';

describe('ReviewAnswersComponent', () => {
  let component: ReviewAnswersComponent;
  let fixture: ComponentFixture<ReviewAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAnswersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
