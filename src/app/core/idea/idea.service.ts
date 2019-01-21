import { Injectable } from '@angular/core';
import { Idea } from '@app/shared/idea';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import BACKEND_URLS from '@app/shared/backend-urls';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  constructor(private http: HttpClient) {}

  /**
   * addIdea
   */
  public addIdea(context: Idea) {
    const idea = {
      idea_name: context.idea_name,
      description: context.description,
      require_assistance: context.require_assistance,
      owner: JSON.parse(localStorage.getItem('credentials'))['user_id']
    };
    return this.http.post<any>(BACKEND_URLS.IDEA, idea).pipe(
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
          return res;
        })
      );
  }
  /**
   * getNIdeas
   */
  public getNIdeas(cursor: string) {
    return this.http
      .get(BACKEND_URLS.IDEA, {
        params: {
          idea_cursor: cursor
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
   * LikeIdea
   */
  public likeIdea(ideaId: string) {
    const url = BACKEND_URLS.UPDATE_UPVOTES + ideaId;
    return this.http.put(url, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * FetchComments
   */
  public FetchComments(ideaId: string) {
    const url = BACKEND_URLS.FETCH_COMMENTS + ideaId;
    return this.http.get(url).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
