import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-editable-comment',
  templateUrl: './editable-comment.component.html',
  styleUrls: ['./editable-comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableCommentComponent implements OnInit {
  @Input() comment: any;
  // If a comment was edited this event will be emitted
  @Output() commentEdited = new EventEmitter();
  reply = '';

  options: any = {
    lineWrapping: true
  };
  replying = false;

  constructor(private projectService: ProjectService, private errorHandler: ErrorHandlerService) {}

  ngOnInit() {
    console.log(this.comment);
  }

  onContentSaved(content: any) {
    this.commentEdited.next(content);
  }

  replyToComment() {
    this.replying = true;
  }

  addCommentReply(commentId: string) {
    this.projectService
      .addReply(commentId, this.reply)
      .pipe(
        finalize(() => {
          this.replying = false;
        })
      )
      .subscribe(
        reply => {
          reply.respondent = JSON.parse(localStorage.getItem('credentials'))['username'];
          this.comment.comment_replies.push(reply);
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  cancel(): void {
    this.replying = false;
  }
}
