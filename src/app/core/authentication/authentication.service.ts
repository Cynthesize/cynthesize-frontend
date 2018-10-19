import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import BACKEND_URLS from '../../shared/backend-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { Logger } from '../logger.service';
import { finalize, map } from 'rxjs/operators';

const log = new Logger('HttpCacheService');

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
export interface Credentials {
  username: string | null;
  token: string;
}

export interface RegisterContext {
  username: string;
  fullname: string;
  email: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  private headers: HttpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Registers the user
   * @param {RegisterContext} context
   */
  register(context: RegisterContext) {
    const user = {
      username: context.username,
      full_name: context.fullname,
      email: context.email,
      password: context.password
    };
    console.log('lulz here');
    
    return this.http.post<any>(BACKEND_URLS.USER_AUTH_REGISTER, user, {headers: this.headers})
      .pipe(map((res: any) => {
        console.log(res);
        if (res.username === context.username) {
          this.router.navigate(['/login']);
        }
        return res;
      }));
  }
  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const user = {
      username: context.username,
      password: context.password
    };
    return this.http.post<any>(BACKEND_URLS.USER_AUTH_LOGIN, user)
      .pipe(map((res: any) => {
        if (res && res.token) {
          res.username = context.username;
          this.setCredentials(res, context.remember);
        }
        return res;
      }));
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
