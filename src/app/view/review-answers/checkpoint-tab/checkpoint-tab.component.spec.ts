import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpointTabComponent } from './checkpoint-tab.component';

describe('CheckpointTabComponent', () => {
  let component: CheckpointTabComponent;
  let fixture: ComponentFixture<CheckpointTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckpointTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
