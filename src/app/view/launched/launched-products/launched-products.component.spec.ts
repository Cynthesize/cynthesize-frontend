import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchedProductsComponent } from './launched-products.component';

describe('LaunchedProductsComponent', () => {
  let component: LaunchedProductsComponent;
  let fixture: ComponentFixture<LaunchedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchedProductsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
