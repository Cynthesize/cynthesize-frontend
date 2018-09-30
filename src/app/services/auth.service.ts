import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import BACKEND_URLS from '../models/backend_urls';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: Headers = new Headers(
    {'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  login(user: User): Promise<any> {
    return this.http.post(
      BACKEND_URLS.USER_AUTH_LOGIN, user,
      {headers: this.headers}).toPromise();
  }

  register(user: User): Promise<any> {
    return this.http.post(
      BACKEND_URLS.USER_AUTH_REGISTER, user,
      {headers: this.headers}).toPromise();
  }
}
