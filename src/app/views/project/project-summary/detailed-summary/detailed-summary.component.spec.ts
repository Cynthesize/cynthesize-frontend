import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSummaryComponent } from './detailed-summary.component';

describe('DetailedSummaryComponent', () => {
  let component: DetailedSummaryComponent;
  let fixture: ComponentFixture<DetailedSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
