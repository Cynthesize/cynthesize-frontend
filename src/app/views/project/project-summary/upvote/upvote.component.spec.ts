import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvoteComponent } from './upvote.component';

describe('UpvoteComponent', () => {
  let component: UpvoteComponent;
  let fixture: ComponentFixture<UpvoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpvoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
