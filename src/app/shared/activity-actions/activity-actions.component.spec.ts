import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityActionsComponent } from './activity-actions.component';

describe('ActivityActionsComponent', () => {
  let component: ActivityActionsComponent;
  let fixture: ComponentFixture<ActivityActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
