import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_CHECKPOINT_ISSUES, QUERY_OPEN_ISSUES } from '@app/shared/queries/project-queries';
import { map, take } from 'rxjs/operators';
import {
  MUTATION_ADD_ISSUE,
  MUTATION_ADD_ISSUE_COMMENT_REPLY,
  MUTATION_ADD_ISSUE_COMMENT,
  MUTATION_MARK_ISSUE_RESOLVED_OR_UNRESOLVED
} from '@app/shared/mutations/project-mutations';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private apollo: Apollo) {}

  /**
   * fetchIssueInCheckpoint
   */
  public fetchIssueInCheckpoint(checkpointName: string, projectId: number) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_CHECKPOINT_ISSUES,
        variables: {
          checkpointName: checkpointName,
          projectId: projectId
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
   * fetchOpenIssues
   */
  public fetchOpenIssues() {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_OPEN_ISSUES
      })
      .valueChanges.pipe(take(1))
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
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_ISSUE_COMMENT,
        variables: {
          objects: {
            comment_text: commentText,
            project_id: projectId,
            issue_id: issueId,
            commenter: localStorage.getItem('userId')
          }
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
   * Add Reply for a comment in the project.
   */
  public addReply(commentId: string, replyText: string) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_ISSUE_COMMENT_REPLY,
        variables: {
          objects: {
            reply_text: replyText,
            comment_id: commentId,
            respondent: localStorage.getItem('userId')
          }
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
   * Add Issue for a checkpoint in the project.
   */
  public addIssue(checkpointName: string, issuesDescription: string, projectId: string) {
    return this.apollo
      .mutate({
        mutation: MUTATION_ADD_ISSUE,
        variables: {
          objects: {
            checkpoint_name: checkpointName,
            description: issuesDescription,
            project_id: projectId,
            created_by: localStorage.getItem('userId')
          }
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
   * Marks issue resolved or unresolved.
   */
  public markIssueResolvedOrUnsolved(issueId: number, resolution: boolean) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_MARK_ISSUE_RESOLVED_OR_UNRESOLVED,
        variables: {
          issueId: issueId,
          resolution: resolution
        }
      })
      .pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
