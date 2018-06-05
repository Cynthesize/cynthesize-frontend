import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDashboardComponent } from './board-dashboard.component';

describe('BoardDashboardComponent', () => {
  let component: BoardDashboardComponent;
  let fixture: ComponentFixture<BoardDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
