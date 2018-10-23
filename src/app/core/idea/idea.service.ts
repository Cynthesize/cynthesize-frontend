import { Injectable } from '@angular/core';
import { Idea } from '@app/shared/idea';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import BACKEND_URLS from '@app/shared/backend-urls';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('credentials'))['token']}`
  });

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * addIdea
   */
  public addIdea(context: Idea) {
    const idea = {
      ideaname: context.idea_name,
      description: context.description,
      require_assistance: context.require_assistance,
      owner: JSON.parse(localStorage.getItem('credentials'))['username']
    };
    console.log(JSON.parse(localStorage.getItem('credentials'))['token'], idea, context);
    return this.http.post<any>(BACKEND_URLS.IDEA, idea, { headers: this.headers }).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
  /**
   * getIdea
   */
  public getIdea(id: string) {
    return this.http
      .get(BACKEND_URLS.IDEA, {
        params: {
          id: id
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
