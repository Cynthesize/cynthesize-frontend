import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import BACKEND_URLS from '@app/shared/backend-urls';
import { map } from 'rxjs/operators';

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
          console.log(res);
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
          console.log(res);
          return res;
        })
      );
  }
}
