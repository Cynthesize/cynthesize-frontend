import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  login(user: User): Promise<any> {
    const url = '/api/auth/login';
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user: User): Promise<any> {
    const url = '/api/auth/register';
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  ensureAuthenticated(token): Promise<any> {
    const url = '/api/auth/status';
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
}