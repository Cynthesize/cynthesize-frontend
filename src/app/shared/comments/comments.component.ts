import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { CommentsService } from '@app/core/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() activityType: string;
  @Input() activityId: number;
  commentObject: any[] = [];
  user_pic = localStorage.getItem('user_profile_pic');

  isCommenting = false;
  options: any = {
    lineWrapping: true
  };

  constructor(
    private commentService: CommentsService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  ngOnChanges(changes: SimpleChanges) {}

  fetchComments(): void {
    this.commentService.fetchComments(this.activityId, this.activityType).subscribe(
      (data: any) => {
        this.commentObject = data.data.comment;
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}
