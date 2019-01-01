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

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit {
  @Input()
  activityId: string;
  @Input()
  activityType: string;
  @Input()
  issueCommentObject: [IssueComments];
  options: any = {
    lineWrapping: true,
    toolbar: true
  };
  comment: '';

  @Input() comments: any;
  @Output() commentsUpdated = new EventEmitter();
  @ViewChild(EditableDirective) newCommentEditor: any;

  commentsArray = [Object];

  constructor(private ideaService: IdeaService, private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log(this.activityType);
    if (this.activityType === 'issue') {
      console.log(this.issueCommentObject);
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

  addNewComment() {
    const comments = this.comments.slice();
    comments.splice(0, 0, {
      user: localStorage.getItem(''),
      time: +new Date(),
      content: this.newCommentEditor.getEditableContent()
    });
    this.commentsUpdated.next(comments);
    this.newCommentEditor.setEditableContent('');
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
}
