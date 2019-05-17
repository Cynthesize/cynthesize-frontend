import { Injectable } from '@angular/core';
import { MUTATION_ADD_TAGS_TO_DB, MUTATION_ADD_TAGS_LINKS } from '@app/shared/mutations/tags-mutations';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { QUERY_FETCH_TAGS } from '@app/shared/queries/project-queries';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private apollo: Apollo) {}

  /**
   * Adds Project Tags
   */
  public addProjectTags(tags: any, projectId: any) {
    const tagTBP: any[] = [];
    tags.forEach((tag: any) => {
      tagTBP.push({ project_id: projectId, tag_id: tag.tag_id });
    });
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_TAGS_LINKS,
        variables: {
          objects: tagTBP
        }
      })
      .pipe(take(1))
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /**
   * addNewTagsToDb
   */
  public addNewTagsToDb(tagsList: Array<object>) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_TAGS_TO_DB,
        variables: {
          objects: tagsList
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
   * getTagsFromDB
   */
  public getTagsFromDB() {
    return this.apollo
      .query<any>({
        query: QUERY_FETCH_TAGS
      })
      .pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
