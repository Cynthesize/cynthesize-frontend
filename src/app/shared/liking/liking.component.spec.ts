import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikingComponent } from './liking.component';

describe('LikingComponent', () => {
  let component: LikingComponent;
  let fixture: ComponentFixture<LikingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LikingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
