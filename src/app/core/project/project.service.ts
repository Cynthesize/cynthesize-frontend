import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  MUTATION_ADD_PROJECT,
  MUTATION_UPDATE_PROJECT_DESCRIPTION,
  MUTATION_ADD_PROJECT_DESCRIPTION,
  MUTATION_UPDATE_PROJECT_EVENTS,
  MUTATION_APPLY_FOR_COLLABORATION,
  MUTATION_UPDATE_PROJECT_DETAILS
} from '@app/shared/mutations/project-mutations';
import {
  QUERY_NEWEST_LAUNCHED_PROJECTS,
  QUERY_POPULAR_LAUNCHED_PROJECTS,
  QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT,
  QUERY_FETCH_BASIC_PROJECT_DETAILS,
  QUERY_FETCH_PROJECT_DETAILS
} from '@app/shared/queries/project-queries';
import {
  MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE,
  MUTATION_SEND_PROJECT_FOR_MARKETING_STAGE,
  MUTATION_SEND_PROJECT_FOR_PROTOTYPE_DEV_STAGE,
  MUTATION_SEND_PROJECT_FOR_LAUNCHING_STAGE,
  MUTATION_SEND_PROJECT_FOR_CONSUMER_FEEDBACK_STAGE,
  MUTATION_SEND_PROJECT_FOR_FUNDING_STAGE
} from '@app/shared/mutations/review-mutation';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private apollo: Apollo, private authService: AuthenticationService) {}

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
              icon: projectDetails['icon'],
              owner: this.authService.user_id
            }
          ]
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
   * Add Project Description
   */
  public addProjectDescription(projectId: number) {
    const date = Date.now().toString();
    const obj = {};
    obj[date] = 'Project Created';
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_ADD_PROJECT_DESCRIPTION,
        variables: {
          projectId: projectId,
          initTimeline: obj,
          projectOwner: this.authService.user_id
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
      .valueChanges.pipe(take(1))
      .pipe(
        map((res: any) => {
          return res.data.projects[0];
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
      .pipe(take(1))
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
   * Updates project description data
   */
  public updateProjectDescription(updatedData: Object, projectId: number) {
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
   * Updates project details data
   */
  public updateProjectDetails(updatedData: Object, projectId: number) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_UPDATE_PROJECT_DETAILS,
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
      user_id: this.authService.user_id
    };
    if (additionalInfo) {
      applyObject['additional_info'] = additionalInfo;
    }
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_APPLY_FOR_COLLABORATION,
        variables: {
          objects: [applyObject]
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
   * applyForReview
   */
  public applyForReview(answers: Object, stage: string) {
    let mutation;
    switch (stage) {
      case 'ideation_stage':
        mutation = MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE;
        break;
      case 'marketing_stage':
        mutation = MUTATION_SEND_PROJECT_FOR_MARKETING_STAGE;
        break;
      case 'prototype_development_stage':
        mutation = MUTATION_SEND_PROJECT_FOR_PROTOTYPE_DEV_STAGE;
        break;
      case 'launching_stage':
        mutation = MUTATION_SEND_PROJECT_FOR_LAUNCHING_STAGE;
        break;
      case 'consumer_feedback_stage':
        mutation = MUTATION_SEND_PROJECT_FOR_CONSUMER_FEEDBACK_STAGE;
        break;
      case 'funding_stage':
        mutation = MUTATION_SEND_PROJECT_FOR_FUNDING_STAGE;
        break;
      default:
        mutation = MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE;
        break;
    }
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: {
          objects: answers
        }
      })
      .pipe(take(1))
      .pipe(
        map((arg: any) => {
          return arg;
        })
      );
  }

  public displayableName(str: string) {
    str = str.replace(/ /g, ' ');
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
}
