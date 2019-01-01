import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-comment',
  templateUrl: './editable-comment.component.html',
  styleUrls: ['./editable-comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableCommentComponent implements OnInit {
  @Input() time: string;
  @Input() user: string;
  @Input() content: string;
  @Input() type: string;
  // If a comment was edited this event will be emitted
  @Output() commentEdited = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onContentSaved(content: any) {
    this.commentEdited.next(content);
  }
}
