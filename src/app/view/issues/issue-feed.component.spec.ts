import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFeedComponent } from './issue-feed.component';

describe('IssueFeedComponent', () => {
  let component: IssueFeedComponent;
  let fixture: ComponentFixture<IssueFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueFeedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
