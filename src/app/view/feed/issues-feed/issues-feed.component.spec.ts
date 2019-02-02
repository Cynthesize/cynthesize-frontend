import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesFeedComponent } from './issues-feed.component';

describe('IssuesFeedComponent', () => {
  let component: IssuesFeedComponent;
  let fixture: ComponentFixture<IssuesFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesFeedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
