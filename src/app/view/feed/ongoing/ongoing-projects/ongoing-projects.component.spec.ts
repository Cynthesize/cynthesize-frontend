import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingProjectsComponent } from './ongoing-projects.component';

describe('OngoingProjectsComponent', () => {
  let component: OngoingProjectsComponent;
  let fixture: ComponentFixture<OngoingProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingProjectsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
