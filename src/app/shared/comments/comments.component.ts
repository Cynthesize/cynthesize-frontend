import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input()
  ideaId: string;

  commentsArray = [Object];

  constructor(private ideaService: IdeaService) {}

  ngOnInit() {
    this.fetchIdeaComments();
  }

  fetchIdeaComments() {
    this.ideaService
      .FetchComments(this.ideaId)
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
}
