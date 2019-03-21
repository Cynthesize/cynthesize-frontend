import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { ProjectService } from '@app/core/project/project.service';
import { AuthenticationService } from '@app/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '@app/auth/login/login.component';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() ideaId: number;
  @Input() projectId: number;
  @Input() upvotes: number;
  @Input() likes: number;
  isLoading = false;

  constructor(
    private ideaService: IdeaService,
    private errorHandler: ErrorHandlerService,
    private projectService: ProjectService,
    public authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

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

  isProjectLikedByLoggedInUser(projectId: number) {
    let flag = false;
    JSON.parse(localStorage.getItem('projectsLikedByLoggedInUser')).forEach((likedProjectIds: any) => {
      if (projectId === likedProjectIds) {
        flag = true;
      }
    });
    return flag;
  }

  upvoteProject(projectId: number, isAlreadyLiked: boolean) {
    this.isLoading = true;
    this.projectService.likeProject(projectId, isAlreadyLiked).subscribe(
      data => {
        this.isLoading = false;
        this.likes = data.data.update_launched_projects.returning[0].likes;
      },
      error => {
        this.errorHandler.subj_notification.next(error.message);
      }
    );
    this._updateLikedProjectsInLocalStorage(projectId, isAlreadyLiked);
  }

  private _updateLikedProjectsInLocalStorage(projectId: number, shouldRemove: boolean) {
    const upvotedProjects = JSON.parse(localStorage.getItem('projectsLikedByLoggedInUser'));
    if (shouldRemove) {
      for (let i = 0; i < upvotedProjects.length; i++) {
        upvotedProjects.splice(i, 1);
      }
    } else {
      upvotedProjects.push(projectId);
    }
    localStorage.setItem('projectsLikedByLoggedInUser', JSON.stringify(upvotedProjects));
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
