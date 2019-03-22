import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedProjectComponent } from './feed-project.component';

describe('FeedProjectComponent', () => {
  let component: FeedProjectComponent;
  let fixture: ComponentFixture<FeedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedProjectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
