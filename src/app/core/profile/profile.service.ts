import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import BACKEND_URLS from '@app/shared/backend-urls';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  QUERY_USER_DETAILS,
  QUERY_USER_MINIMAL_CONTRIBUTIONS,
  QUERY_USER_DETAILED_CONTRIBUTIONS_IDEAS,
  QUERY_USER_DETAILED_CONTRIBUTIONS_PROJECTS
} from '@app/shared/queries/user-queries';
import { MUTATION_UPDATE_USER_DETAILS } from '@app/shared/mutations/user-mutations';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router, private apollo: Apollo) {}

  /*
   * getUserDetails
   */
  public getUserDetails(username: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_USER_DETAILS,
        variables: {
          username: username
        }
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  /*
   * getUserMinimalContributions
   */
  public getUserMinimalContributions(username: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_USER_MINIMAL_CONTRIBUTIONS,
        variables: {
          username: username
        }
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  /*
   * getUserDetailedContributions
   */
  public getUserDetailedContributions(username: string, context: string) {
    let query = QUERY_USER_DETAILED_CONTRIBUTIONS_IDEAS;
    if (context === 'projects' || context === 'project') {
      query = QUERY_USER_DETAILED_CONTRIBUTIONS_PROJECTS;
    }
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: {
          username: username
        }
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  /**
   * getUserContributions
   */
  public getUserContributions() {
    return this.http
      .get(BACKEND_URLS.USER_CONTRIBUTIONS_DETAILS, {
        params: {
          username: this.router.url.split('/')[2]
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * UpdateUserDetails
   */
  public UpdateUserDetails(updateObject: Object) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_UPDATE_USER_DETAILS,
        variables: {
          userId: localStorage.getItem('userId'),
          updateObject: updateObject
        }
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * uploadImage
   */
  public uploadImage(image: File): Observable<Object> {
    const formData = new FormData();
    formData.append('file', image, localStorage.getItem('username'));
    formData.append('upload_preset', 'qdninpjl');
    return this.http.post('https://api.cloudinary.com/v1_1/cynthesize/image/upload/', formData);
  }
}
