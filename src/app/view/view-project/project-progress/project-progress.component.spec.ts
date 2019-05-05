import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressComponent } from './project-progress.component';

describe('ProjectProgressComponent', () => {
  let component: ProjectProgressComponent;
  let fixture: ComponentFixture<ProjectProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectProgressComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
