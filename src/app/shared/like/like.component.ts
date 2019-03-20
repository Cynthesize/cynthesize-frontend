import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() ideaId: number;
  @Input() upvotes: number;
  isLoading = false;

  constructor(private ideaService: IdeaService, private errorHandler: ErrorHandlerService) {}

  ngOnInit() {}

  isIdeaLikedByLoggedInUser(ideaId: number) {
    let flag = false;
    JSON.parse(localStorage.getItem('ideaUpvotedByLoggedInUser')).forEach((likedIdeaIds: any) => {
      if (ideaId === likedIdeaIds) {
        flag = true;
      }
    });
    return flag;
  }

  upvoteIdea(ideaId: number, isAlreadyLiked: boolean) {
    this.isLoading = true;
    this.ideaService.likeIdea(ideaId, isAlreadyLiked).subscribe(
      data => {
        this.isLoading = false;
        this.upvotes = data.data.update_ideas.returning[0].upvotes;
      },
      error => {
        this.errorHandler.subj_notification.next(error.message);
      }
    );
    this._updateLikedIdeasInLocalStorage(ideaId, isAlreadyLiked);
  }

  private _updateLikedIdeasInLocalStorage(ideaId: number, shouldRemove: boolean) {
    const upvotedIdeas = JSON.parse(localStorage.getItem('ideaUpvotedByLoggedInUser'));
    if (shouldRemove) {
      for (let i = 0; i < upvotedIdeas.length; i++) {
        upvotedIdeas.splice(i, 1);
      }
    } else {
      upvotedIdeas.push(ideaId);
    }
    localStorage.setItem('ideaUpvotedByLoggedInUser', JSON.stringify(upvotedIdeas));
  }
}
