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
  @Input() correspondingComment: any;
  @Input() activityId: number;
  // If a comment was edited this event will be emitted
  @Output() commentEdited = new EventEmitter();
  replyText = '';

  options: any = {
    lineWrapping: true
  };
  isReplying = false;

  constructor(
    public projectService: ProjectService,
    private errorHandler: ErrorHandlerService,
    private commentService: CommentsService
  ) {}

  ngOnInit() {}

  onContentSaved(content: any) {
    this.commentEdited.next(content);
  }

  addReply() {
    console.log(this.reply);
    this.commentService.addReplyToComment(this.replyText, this.reply.comment_id).subscribe(
      reply => {
        this.correspondingComment.replies.push(reply.data.insert_reply.returning[0]);
        this.replyText = '';
        this.isReplying = false;
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  reportComment() {
    this.commentService.reportAComment(this.comment.id).subscribe(
      data => {
        this.errorHandler.subj_notification.next('This comment has reported! We will look into it.');
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}
