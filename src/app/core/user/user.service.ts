import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_USER_LIKES, QUERY_APPLIED_FOR_MENTORSHIP } from '@app/shared/queries/user-queries';
import { MUTATION_ADD_USER, MUTATION_APPLY_FOR_MENTORSHIP } from '@app/shared/mutations/user-mutations';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) {}

  /**
   * HandleUserData
   */
  public HandleUserData(credential: any) {
    if (credential.additionalUserInfo.isNewUser) {
      this._addUserToDb(credential);
    } else {
      this._fetchUserDetails(
        credential.additionalUserInfo.profile['email'].split('@')[0],
        credential.additionalUserInfo.profile['picture']
      );
    }
    localStorage.setItem('access_token', credential.credential['accessToken']);
    localStorage.setItem('user_id', credential.additionalUserInfo.profile['id']);
  }

  /**
   * applyForMentorship
   */
  public applyForMentorship(formData: any) {
    formData['user_id'] = localStorage.getItem('userId');
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_APPLY_FOR_MENTORSHIP,
        variables: {
          objects: formData
        }
      })
      .pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * checkMentorshipData
   */
  public checkMentorshipData() {
    return this.apollo
      .query<any>({
        query: QUERY_APPLIED_FOR_MENTORSHIP,
        variables: {
          userId: localStorage.getItem('userId')
        }
      })
      .pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  private _addUserToDb(credential: any) {
    this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_USER,
        variables: {
          objects: [
            {
              user_id: credential.user.uid,
              email: credential.additionalUserInfo.profile['email'],
              name: credential.additionalUserInfo.profile['name'],
              username: credential.additionalUserInfo.profile['email'].split('@')[0],
              profile_pic: credential.additionalUserInfo.profile['picture']
            }
          ]
        }
      })
      .subscribe(
        data => {
          this.saveLocalStorageValues(
            '[]',
            credential.additionalUserInfo.profile.picture,
            data.data.insert_user.returning[0].username,
            data.data.insert_user.returning[0].id,
            '[]',
            '[]'
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  private _fetchUserDetails(username: string, picture: string) {
    this.apollo
      .watchQuery<any>({
        query: QUERY_USER_LIKES,
        variables: {
          userName: username
        }
      })
      .valueChanges.subscribe(
        (likes: any) => {
          const likedComments: any = [];
          const likedProjects: any = [];
          const likedReplies: any = [];

          likes.data.user[0].comment_likes.forEach((commentUserLikes: any) => {
            likedComments.push(commentUserLikes.comment_id);
          });
          likes.data.user[0].project_likes.forEach((commentUserLikes: any) => {
            likedProjects.push(commentUserLikes.project_id);
          });
          likes.data.user[0].reply_likes.forEach((replyUserLikes: any) => {
            likedReplies.push(replyUserLikes.reply_id);
          });
          this.saveLocalStorageValues(
            JSON.stringify(likedComments),
            picture,
            username,
            likes.data.user[0].id,
            JSON.stringify(likedProjects),
            JSON.stringify(likedReplies)
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  private saveLocalStorageValues(
    commentLikes: string,
    pic: string,
    username: string,
    userId: string,
    projectLikes: string,
    replyLikes: string
  ) {
    localStorage.setItem('user_profile_pic', pic);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('commentsLikedByLoggedInUser', commentLikes);
    localStorage.setItem('projectsLikedByLoggedInUser', projectLikes);
    localStorage.setItem('repliesLikedByLoggedInUser', replyLikes);
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}
