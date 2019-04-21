import { Component, OnInit, Input } from '@angular/core';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { AuthenticationService } from '@app/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '@app/auth/login/login.component';
import { LikeService } from '@app/core/like/like.service';
import { MUTATION_LIKE_PROJECT, MUTATION_DISLIKE_PROJECT } from '../mutations/project-mutations';
import {
  MUTATION_DISLIKE_COMMENT,
  MUTATION_LIKE_COMMENT,
  MUTATION_DISLIKE_REPLY,
  MUTATION_LIKE_REPLY
} from '../mutations/user-mutations';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() activityId: number;
  @Input() activityType: string;
  @Input() likes: number;
  filteredInfo = {};
  isAlreadyLiked = false;
  isLoading = false;

  constructor(
    private likeService: LikeService,
    private errorHandler: ErrorHandlerService,
    public authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.filteredInfo = this._filterActivityType(this.activityId, this.activityType);
    }
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: 'auto'
    });
  }

  likeOrDislike() {
    this.filteredInfo = this._filterActivityType(this.activityId, this.activityType);
    this.isLoading = true;
    this.likeService.likeOrDisLike(this.filteredInfo).subscribe(
      data => {
        this.isLoading = false;
        this.handleLikeOperationUponResponse(data, this.filteredInfo);
      },
      error => {
        this.errorHandler.subj_notification.next(error.message);
      }
    );
  }

  handleLikeOperationUponResponse(responseData: any, filteredInfo: object) {
    if (filteredInfo['projectId']) {
      this.likes = responseData.data.update_projects.returning[0].likes;
      this._updateLikedProjectsInLocalStorage(this.activityId, this.isAlreadyLiked);
    } else if (filteredInfo['commentId']) {
      this.likes = responseData.data.update_comment.returning[0].likes;
      this._updateLikedCommentsInLocalStorage(this.activityId, this.isAlreadyLiked);
    } else if (filteredInfo['replyId']) {
      this.likes = responseData.data.update_reply.returning[0].likes;
      this._updateLikedRepliesInLocalStorage(this.activityId, this.isAlreadyLiked);
    }
  }

  _filterActivityType(activityId: number, activityType: string) {
    const _object = {};
    switch (activityType) {
      case 'project':
        this.isAlreadyLiked = this.isProjectLikedByLoggedInUser(activityId);
        _object['projectId'] = activityId;
        _object['mutation'] = this.isAlreadyLiked ? MUTATION_DISLIKE_PROJECT : MUTATION_LIKE_PROJECT;
        break;

      case 'comment':
        this.isAlreadyLiked = this.isCommentLikedByLoggedInUser(activityId);
        _object['commentId'] = activityId;
        _object['mutation'] = this.isAlreadyLiked ? MUTATION_DISLIKE_COMMENT : MUTATION_LIKE_COMMENT;
        break;

      case 'reply':
        this.isAlreadyLiked = this.isReplyLikedByLoggedInUser(activityId);
        _object['replyId'] = activityId;
        _object['mutation'] = this.isAlreadyLiked ? MUTATION_DISLIKE_REPLY : MUTATION_LIKE_REPLY;
        break;
      default:
        break;
    }
    _object['userId'] = localStorage.getItem('user_id');
    return _object;
  }

  isProjectLikedByLoggedInUser(projectId: number) {
    let flag = false;
    JSON.parse(localStorage.getItem('projectsLikedByLoggedInUser') || '[]').forEach((likedProjectIds: any) => {
      if (projectId === likedProjectIds) {
        flag = true;
      }
    });
    return flag;
  }

  isCommentLikedByLoggedInUser(commentId: number) {
    let flag = false;
    JSON.parse(localStorage.getItem('commentsLikedByLoggedInUser') || '[]').forEach((likedCommentIds: any) => {
      if (commentId === likedCommentIds) {
        flag = true;
      }
    });
    return flag;
  }

  isReplyLikedByLoggedInUser(replyId: number) {
    let flag = false;
    JSON.parse(localStorage.getItem('repliesLikedByLoggedInUser') || '[]').forEach((likedReplyIds: any) => {
      if (replyId === likedReplyIds) {
        flag = true;
      }
    });
    return flag;
  }

  private _updateLikedProjectsInLocalStorage(projectId: number, shouldRemove: boolean) {
    const upvotedProjects = JSON.parse(localStorage.getItem('projectsLikedByLoggedInUser'));
    if (shouldRemove) {
      for (let i = 0; i < upvotedProjects.length; i++) {
        if (upvotedProjects[i] === projectId) {
          upvotedProjects.splice(i, 1);
        }
      }
      this.isAlreadyLiked = false;
    } else {
      upvotedProjects.push(projectId);
      this.isAlreadyLiked = true;
    }
    localStorage.setItem('projectsLikedByLoggedInUser', JSON.stringify(upvotedProjects));
  }

  private _updateLikedCommentsInLocalStorage(commentId: number, shouldRemove: boolean) {
    const upvotedComments = JSON.parse(localStorage.getItem('commentsLikedByLoggedInUser'));
    if (shouldRemove) {
      for (let i = 0; i < upvotedComments.length; i++) {
        if (upvotedComments[i] === commentId) {
          upvotedComments.splice(i, 1);
        }
      }
      this.isAlreadyLiked = false;
    } else {
      upvotedComments.push(commentId);
      this.isAlreadyLiked = true;
    }
    localStorage.setItem('commentsLikedByLoggedInUser', JSON.stringify(upvotedComments));
  }

  private _updateLikedRepliesInLocalStorage(replyId: number, shouldRemove: boolean) {
    const upvotedReplies = JSON.parse(localStorage.getItem('repliesLikedByLoggedInUser'));
    if (shouldRemove) {
      for (let i = 0; i < upvotedReplies.length; i++) {
        if (upvotedReplies[i] === replyId) {
          upvotedReplies.splice(i, 1);
        }
      }
      this.isAlreadyLiked = false;
    } else {
      upvotedReplies.push(replyId);
      this.isAlreadyLiked = true;
    }
    localStorage.setItem('repliesLikedByLoggedInUser', JSON.stringify(upvotedReplies));
  }
}
