import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { CommentsService } from '@app/core/comments/comments.service';

@Component({
  selector: 'app-editable-comment',
  templateUrl: './editable-comment.component.html',
  styleUrls: ['./editable-comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableCommentComponent implements OnInit {
  @Input() comment: any;
  @Input() reply: any;
  @Input() activityId: number;
  // If a comment was edited this event will be emitted
  @Output() commentEdited = new EventEmitter();

  options: any = {
    lineWrapping: true
  };
  replying = false;

  constructor(
    public projectService: ProjectService,
    private errorHandler: ErrorHandlerService,
    private commentService: CommentsService
  ) {}

  ngOnInit() {}

  onContentSaved(content: any) {
    this.commentEdited.next(content);
  }

  replyToComment() {
    this.replying = true;
  }

  addComment(commentId: number, commentText: string) {
    console.log(this.comment);
    this.commentService.addComment(commentId, 'comment', commentText, this.activityId).subscribe(
      comment => {
        this.comment.push(comment.data.insert_comments.returning[0]);
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
  addReply(replyId: number, replyText: string) {
    console.log(this.reply);
    this.commentService.addReplyToComment(replyText, replyId).subscribe(
      reply => {
        this.reply.push(reply.data.insert_replys.returning[0]);
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  reportComment() {
    this.commentService.reportAComment(this.comment.id).subscribe(
      data => {
        console.log(data);
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
