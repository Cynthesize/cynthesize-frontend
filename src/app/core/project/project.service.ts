import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import BACKEND_URLS from '@app/shared/backend-urls';
import { map } from 'rxjs/operators';
import { IssueComments } from '@app/shared/objects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `JWT ${JSON.parse(localStorage.getItem('credentials'))['token']}`
    })
  };
  constructor(private http: HttpClient) {}
  /**
   * getProject
   */
  public getProject(id: string) {
    return this.http
      .get(BACKEND_URLS.FETCH_PROJECT_DETAILS, {
        params: {
          id: '2'
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * getProject
   */
  public fetchIdea(idList: string) {
    return this.http
      .get(BACKEND_URLS.FETCH_ISSUE_OBJECT, {
        params: {
          id: idList
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * Add Comments for an issue in the project.
   */
  public addComment(commentText: string, projectId: string, issueId: string) {
    const IssueComment = {
      comment_text: commentText,
      project_id: projectId,
      issue_id: issueId,
      commenter: JSON.parse(localStorage.getItem('credentials'))['user_id']
    };
    return this.http.post<any>(BACKEND_URLS.ADD_ISSUE_COMMENT, IssueComment, this.httpOptions).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
