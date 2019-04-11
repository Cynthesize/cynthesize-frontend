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
          this.comment.projectIssuesReplysBycommentId.push(reply.data.insert_project_issues_reply.returning[0]);
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  public like(commentId: number) {
    this.projectService.incrementOrDecrementLikeCounter(commentId).subscribe(
      (data: any) => {},
      (error: any) => {
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
