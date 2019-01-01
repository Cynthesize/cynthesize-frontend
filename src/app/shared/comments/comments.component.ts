import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  Inject,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProjectService } from '@app/core/project/project.service';
import { EditableDirective } from '../editable.directive';
import { IssueComments } from '../objects';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() activityId: string;
  @Input() activityType: string;
  @Input() issueCommentObject: [IssueComments];
  @Input() comments: any;
  @Output() commentsUpdated = new EventEmitter();
  @ViewChild(EditableDirective) newCommentEditor: any;

  options: any = {
    lineWrapping: true
  };
  comment = '';
  commentsArray = [Object];
  commentingOnIssue = false;
  projectId: string;

  constructor(
    private ideaService: IdeaService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.issueCommentObject);
    if (this.activityType === 'issue') {
      this.projectId = this.router.url.split('/')[2];
    } else {
      console.log('Not issue');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments && changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  fetchIdeaComments() {
    this.ideaService
      .FetchComments(this.activityId)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          this.commentsArray = data;
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addNewComment(projectId: string, issueId: string) {
    console.log(this.comment, projectId, issueId);
    this.projectService
      .addComment(this.comment, projectId, issueId)
      .pipe(
        finalize(() => {
          this.commentingOnIssue = false;
        })
      )
      .subscribe(
        comment => {
          comment.commenter = JSON.parse(localStorage.getItem('credentials'))['username'];
          this.issueCommentObject.push(comment);
          console.log(`Comment Added`);
        },
        error => {
          console.log(error);
        }
      );
  }

  onCommentEdited(comment: any, content: any) {
    const comments = this.comments.slice();
    // If the comment was edited with e zero length content, we
    // will delete the comment from the list
    if (content.length === 0) {
      comments.splice(comments.indexOf(comment), 1);
    } else {
      // Otherwise we're replacing the existing comment
      comments.splice(comments.indexOf(comment), 1, {
        user: comment.user,
        time: comment.time,
        content
      });
    }
    // Emit event so the updated comment list can be persisted
    // outside the component
    this.commentsUpdated.next(comments);
  }

  addCommentBox(): void {
    this.commentingOnIssue = true;
  }

  cancel(): void {
    this.commentingOnIssue = false;
  }
}
