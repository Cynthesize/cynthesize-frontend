import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEditable]'
})
export class EditableDirective {
  constructor(private el: ElementRef) {}

  getEditableContent() {
    return this.el.nativeElement.text;
  }

  setEditableContent(str: string) {
    this.el.nativeElement.text = str;
  }
}
