import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaModalComponent } from './idea-modal.component';

describe('IdeaModalComponent', () => {
  let component: IdeaModalComponent;
  let fixture: ComponentFixture<IdeaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
