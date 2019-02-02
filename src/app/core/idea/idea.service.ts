import { Injectable } from '@angular/core';
import { Idea } from '@app/shared/idea';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { MUTATION_ADD_IDEA, MUTATION_LIKE_IDEA } from '@app/shared/mutations';
import { QUERY_IDEA_DETAILS, QUERY_LIMITED_IDEA_DETAILS, QUERY_TOTAL_IDEA_COUNT } from '@app/shared/queries';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  constructor(private apollo: Apollo) {}

  /**
   * addIdea
   */
  public addIdea(context: Idea) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_IDEA,
        variables: {
          objects: {
            idea_name: context.idea_name,
            description: context.description,
            require_assistance: context.require_assistance,
            owner: localStorage.getItem('userId')
          }
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * getIdea
   */
  public getIdea(id: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_IDEA_DETAILS,
        variables: {
          ideaId: id
        }
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  /**
   * getNIdeas
   */
  public getNIdeas(limit: number, offset: number) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_LIMITED_IDEA_DETAILS,
        variables: {
          limit: limit,
          offset: offset
        }
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  /**
   * LikeIdea
   */
  public likeIdea(ideaId: string) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_LIKE_IDEA,
        variables: {
          idea_id: ideaId,
          user_id: localStorage.getItem('userId')
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * getTotalIdeaCount
   */
  public getTotalIdeaCount() {
    return this.apollo
      .query({
        query: QUERY_TOTAL_IDEA_COUNT
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * getIdeaComments
   */
  public getIdeaComments(idea_id: number) {
    return this.apollo
      .query({
        query: QUERY_IDEA_DETAILS,
        variables: {
          ideaId: idea_id
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
