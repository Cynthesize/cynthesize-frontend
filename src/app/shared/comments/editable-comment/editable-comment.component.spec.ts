import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableCommentComponent } from './editable-comment.component';

describe('EditableCommentComponent', () => {
  let component: EditableCommentComponent;
  let fixture: ComponentFixture<EditableCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableCommentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
