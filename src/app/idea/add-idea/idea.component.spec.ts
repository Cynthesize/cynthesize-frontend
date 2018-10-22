import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { IdeaComponent } from './idea.component';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FlexLayoutModule, MaterialModule],
      declarations: [IdeaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
