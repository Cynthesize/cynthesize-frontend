import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import BACKEND_URLS from '@app/shared/backend-urls';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `JWT ${JSON.parse(localStorage.getItem('credentials'))['token']}`
    })
  };
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * getUserDetails
   */
  public getUserDetails(username: string) {
    return this.http
      .get(BACKEND_URLS.USER_DETAILS, {
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
    let techString = '';
    updateObject['technologies'].forEach((tech: string) => {
      techString += tech + ',';
    });
    if (typeof updateObject['birth_date'] === 'object') {
      updateObject['birth_date'] = updateObject['birth_date'].toISOString().slice(0, 10);
    }
    const request = {
      bio: updateObject['bio'],
      birth_date: updateObject['birth_date'],
      technologies: techString,
      location: updateObject['location'],
      username: JSON.parse(localStorage.getItem('credentials'))['username']
    };
    return this.http.put(BACKEND_URLS.USER_DETAILS, request, this.httpOptions).pipe(
      map((res: any) => {
        console.log(res);

        return res;
      })
    );
  }
}
