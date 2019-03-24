import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasComponent } from './ideas.component';

describe('IdeasComponent', () => {
  let component: IdeasComponent;
  let fixture: ComponentFixture<IdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeasComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
