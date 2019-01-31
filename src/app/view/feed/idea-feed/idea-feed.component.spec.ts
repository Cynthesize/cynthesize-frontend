import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaFeedComponent } from './idea-feed.component';

describe('IdeaFeedComponent', () => {
  let component: IdeaFeedComponent;
  let fixture: ComponentFixture<IdeaFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaFeedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
