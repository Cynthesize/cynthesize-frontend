import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetachedIssueComponent } from './detached-issue.component';

describe('DetachedIssueComponent', () => {
  let component: DetachedIssueComponent;
  let fixture: ComponentFixture<DetachedIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetachedIssueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetachedIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
