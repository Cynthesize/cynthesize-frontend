import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { authClientId, authDomain, callbackUrl, auth0Audience } from '../../../environments/environment';
import { Apollo } from 'apollo-angular';
import { QUERY_USER_CHECK, QUERY_USER_LIKES } from '@app/shared/queries/user-queries';
import { MUTATION_ADD_USER } from '@app/shared/mutations/user-mutations';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  auth0 = new auth0.WebAuth({
    clientID: authClientId,
    domain: authDomain,
    responseType: 'token id_token',
    audience: auth0Audience,
    redirectUri: callbackUrl,
    scope: 'openid profile email'
  });

  constructor(private router: Router, private apollo: Apollo) {}

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('commentsLikedByLoggedInUser');
    localStorage.removeItem('user_profile_pic');
    localStorage.removeItem('username');
    localStorage.removeItem('projectsLikedByLoggedInUser');
    localStorage.removeItem('repliesLikedByLoggedInUser');
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    if (new Date().getTime() < expiresAt) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }
  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.handleUserDatabaseEntry(authResult);
        window.location.hash = '';
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/']);
      }
    });
  }

  private handleUserDatabaseEntry(authResult: any) {
    this.apollo
      .watchQuery<any>({
        query: QUERY_USER_CHECK,
        variables: {
          email: authResult.idTokenPayload.email
        }
      })
      .valueChanges.subscribe((res: any) => {
        if (res.data.user.length === 0) {
          this.apollo
            .mutate<any>({
              mutation: MUTATION_ADD_USER,
              variables: {
                objects: [
                  {
                    user_id: authResult.idTokenPayload.sub,
                    email: authResult.idTokenPayload.email,
                    name: authResult.idTokenPayload.name,
                    username: authResult.idTokenPayload.nickname,
                    profile_pic: authResult.idTokenPayload.picture
                  }
                ]
              }
            })
            .subscribe(data => {
              localStorage.setItem('commentsLikedByUser', JSON.stringify([]));
              localStorage.setItem('projectsLikedByLoggedInUser', JSON.stringify([]));
              localStorage.setItem('repliesLikedByLoggedInUser', JSON.stringify([]));
              localStorage.setItem('user_profile_pic', data.data.insert_user.returning[0].profile_pic);
              localStorage.setItem('username', data.data.insert_user.returning[0].username);
              localStorage.setItem('userId', data.data.insert_user.returning[0].id);
              localStorage.setItem('is_mentor', 'false');
              this.setSession(authResult).then(() => {
                location.reload();
              });
            });
        } else {
          this.apollo
            .watchQuery<any>({
              query: QUERY_USER_LIKES,
              variables: {
                userName: res.data.user[0].username
              }
            })
            .valueChanges.subscribe((likes: any) => {
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

              localStorage.setItem('commentsLikedByLoggedInUser', JSON.stringify(likedComments));
              localStorage.setItem('projectsLikedByLoggedInUser', JSON.stringify(likedProjects));
              localStorage.setItem('repliesLikedByLoggedInUser', JSON.stringify(likedReplies));
            });
          localStorage.setItem('user_profile_pic', res.data.user[0].profile_pic);
          localStorage.setItem('username', res.data.user[0].username);
          localStorage.setItem('is_mentor', JSON.stringify(res.data.user[0].is_mentor));
          localStorage.setItem('userId', res.data.user[0].id);
          this.setSession(authResult).then(() => {
            location.reload();
          });
        }
      });
  }

  private async setSession(authResult: any) {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('user_id', authResult.idTokenPayload.sub);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    return await expiresAt;
  }
}
