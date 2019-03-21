import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSheetComponent } from './share-sheet.component';

describe('ShareSheetComponent', () => {
  let component: ShareSheetComponent;
  let fixture: ComponentFixture<ShareSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareSheetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
