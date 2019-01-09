import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '@app/core';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-liking',
  templateUrl: './liking.component.html',
  styleUrls: ['./liking.component.scss']
})
export class LikingComponent implements OnInit {
  @Input()
  ideaId: string;
  @Input()
  likes: number;

  liked = false;

  constructor(
    private ideaService: IdeaService,
    public authenticationService: AuthenticationService,
    private errorHandler: ErrorHandlerService
  ) {}

  isLiked() {
    if (this.liked === true) {
      return 'primary';
    }
    return;
  }

  like(ideaId: string) {
    this.liked = true;
    this.ideaService
      .likeIdea(ideaId)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          this.likes = data.upvotes;
        },
        (error: any) => {
          this.liked = false;
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
  ngOnInit() {}
}
