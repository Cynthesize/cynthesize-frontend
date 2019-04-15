import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  MUTATION_ADD_PROJECT,
  MUTATION_ADD_ISSUE_COMMENT,
  MUTATION_ADD_ISSUE_COMMENT_REPLY,
  MUTATION_ADD_ISSUE,
  MUTATION_UPDATE_LIKE_COUNTER_WITH_INSERT,
  MUTATION_UPDATE_LIKE_COUNTER_WITH_DELETE,
  MUTATION_UPDATE_PROJECT_DESCRIPTION,
  MUTATION_ADD_PROJECT_DESCRIPTION,
  MUTATION_UPDATE_PROJECT_EVENTS,
  MUTATION_APPLY_FOR_COLLABORATION
} from '@app/shared/mutations/project-mutations';
import {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_NEWEST_LAUNCHED_PROJECTS,
  QUERY_POPULAR_LAUNCHED_PROJECTS,
  QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT,
  QUERY_FETCH_BASIC_PROJECT_DETAILS,
  QUERY_FETCH_PROJECT_DETAILS
} from '@app/shared/queries/project-queries';
import { MUTATION_ADD_IDEA_TAGS } from '@app/shared/mutations/idea-mutations';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private apollo: Apollo) {}

  /**
   * Adds a project.
   */
  public addProject(projectDetails: Object) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_PROJECT,
        variables: {
          objects: [
            {
              project_name: projectDetails['projectName'],
              abstract: projectDetails['abstract'],
              website: projectDetails['website'],
              is_public: projectDetails['isPublic'],
              current_stage: projectDetails['currentStage'],
              owner: localStorage.getItem('userId')
            }
          ]
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  /**
   * Add Project Description
   */
  public addProjectDescription(projectId: number) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_PROJECT_DESCRIPTION,
        variables: {
          projectId: projectId,
          initTimeline: {
            'Project Created': Date.now()
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
      .valueChanges.pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * GET PROJECT DETAILS
   */
  public getProject(id: number, name: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_FETCH_PROJECT_DETAILS,
        variables: {
          projectId: id,
          projectName: name
        }
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res.data.projects[0];
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
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * incrementOrDecrementLikeCounter
   */
  public incrementOrDecrementLikeCounter(commentId: number) {
    let mutationTBU = MUTATION_UPDATE_LIKE_COUNTER_WITH_INSERT;
    let likeOffset = 1;
    if (this._checkCommentStatus(commentId)) {
      mutationTBU = MUTATION_UPDATE_LIKE_COUNTER_WITH_DELETE;
      likeOffset = -1;
      this._updateLocalStorage(false, commentId);
    } else {
      this._updateLocalStorage(true, commentId);
    }
    return this.apollo
      .mutate({
        mutation: mutationTBU,
        variables: {
          likesOffCounter: likeOffset,
          commentId: commentId,
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
   * getTotalLaunchedProjectsCount
   */
  public getTotalLaunchedProjectsCount() {
    return this.apollo
      .query({
        query: QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * getNProjects
   */
  public getNProjects(limit: number, offset: number, context: any) {
    let Query = QUERY_NEWEST_LAUNCHED_PROJECTS;
    switch (context) {
      case 'newest':
        Query = QUERY_NEWEST_LAUNCHED_PROJECTS;
        break;

      case 'popular':
        Query = QUERY_POPULAR_LAUNCHED_PROJECTS;
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
   * fetchBasicProjectDetails
   */
  public fetchBasicProjectDetails(projectName: number) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_FETCH_BASIC_PROJECT_DETAILS,
        variables: {
          projectName: projectName
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
   * Adds Project Tags
   */
  public addProjectTags(tags: any, projectId: any) {
    const tagTBP: any[] = [];
    tags.forEach((tag: any) => {
      tagTBP.push({ project_id: projectId, tag_id: tag.tag_id });
    });
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_IDEA_TAGS,
        variables: {
          objects: tagTBP
        }
      })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /**
   * Updates project description data
   */
  public updateProjectDescription(updatedData: Object, projectId: number) {
    console.log(projectId);

    return this.apollo
      .mutate<any>({
        mutation: MUTATION_UPDATE_PROJECT_DESCRIPTION,
        variables: {
          project_id: projectId,
          updateObject: updatedData
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
   * Updates project events data
   */
  public updateProjectEvents(updatedData: Object, projectId: number) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_UPDATE_PROJECT_EVENTS,
        variables: {
          projectId: projectId,
          objects: updatedData
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
   * Apply for project collaboration for a given role.
   */
  public applyForProjectCollaboration(role: string, projectId: number, additionalInfo: string = null) {
    const applyObject = {
      project_id: projectId,
      for_role: role,
      user_id: localStorage.getItem('userId')
    };
    if (additionalInfo) {
      applyObject['additional_info'] = additionalInfo;
    }
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_APPLY_FOR_COLLABORATION,
        variables: applyObject
      })
      .pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * applyForReview
   */
  public applyForReview(stage: string, answers: Object) {
    switch (stage) {
      case 'idea':
        break;

      default:
        break;
    }
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_IDEA_TAGS,
        variables: answers
      })
      .pipe(take(1))
      .pipe(
        map((arg: any) => {
          return arg;
        })
      );
  }

  private _checkCommentStatus(commentId: number) {
    const userCommentArray = JSON.parse(localStorage.getItem('projectIssuesCommentsLikessByuserId'));
    let flag = false;
    userCommentArray.forEach((comment_id: any) => {
      if (comment_id === commentId) {
        flag = true;
      }
    });
    return flag;
  }

  private _updateLocalStorage(insert: boolean, commentId?: number) {
    const userCommentArray = JSON.parse(localStorage.getItem('projectIssuesCommentsLikessByuserId'));

    if (insert) {
      userCommentArray.push(commentId);
      localStorage.setItem('projectIssuesCommentsLikessByuserId', JSON.stringify(userCommentArray));
      return;
    }
    for (let i = 0; i < userCommentArray.length; i++) {
      if (userCommentArray[i] === commentId) {
        userCommentArray.splice(i, 1);
      }
    }
    localStorage.setItem('projectIssuesCommentsLikessByuserId', JSON.stringify(userCommentArray));
  }
}
