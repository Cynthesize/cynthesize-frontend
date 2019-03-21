import { Injectable } from '@angular/core';
import { Idea } from '@app/shared/idea';
import { map, take } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  MUTATION_ADD_IDEA,
  MUTATION_DELETE_IDEA,
  MUTATION_LIKE_IDEA,
  MUTATION_DISLIKE_IDEA
} from '@app/shared/mutations/idea-mutations';
import {
  QUERY_IDEA_DETAILS,
  QUERY_LIMITED_IDEA_DETAILS,
  QUERY_TOTAL_IDEA_COUNT,
  QUERY_NEWEST_IDEAS,
  QUERY_POPULAR_IDEAS
} from '@app/shared/queries/idea-queries';

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
   *
   * delete idea
   */
  public deleteIdea(id: String) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_DELETE_IDEA,
        variables: {
          ideaId: id
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
  public getIdea(id: number) {
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
  public getNIdeas(limit: number, offset: number, context: any) {
    let Query = QUERY_LIMITED_IDEA_DETAILS;
    switch (context) {
      case 'newest':
        Query = QUERY_NEWEST_IDEAS;
        break;

      case 'popular':
        Query = QUERY_POPULAR_IDEAS;
        break;

      default:
        break;
    }
    return this.apollo
      .watchQuery<any>({
        query: Query,
        variables: {
          limit: limit,
          offset: offset
        }
      })
      .valueChanges.pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * LikeIdea
   */
  public likeIdea(ideaId: number, isAlreadyLiked: boolean) {
    let mutation = MUTATION_LIKE_IDEA;
    let counter = 1;
    if (isAlreadyLiked) {
      mutation = MUTATION_DISLIKE_IDEA;
      counter = -1;
    }
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: {
          likesOffsetCounter: counter,
          ideaId: ideaId,
          userId: localStorage.getItem('userId')
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
