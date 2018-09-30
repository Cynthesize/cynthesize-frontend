import { Injectable } from '@angular/core';
import { Headers, Http, Jsonp } from '@angular/http';
import BACKEND_URLS from '../models/backend_urls';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  addIdea(ideaDetails): Promise<any> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `JWT ${ideaDetails.ownerToken}`
    });
    ideaDetails.owner = this.parseUsernameFromJwtToken(ideaDetails.ownerToken);
    return this.http.post(BACKEND_URLS.ADD_IDEA, ideaDetails, {headers: headers}).toPromise();
  }

  parseUsernameFromJwtToken(token): string {
    return JSON.parse(this.b64DecodeUnicode(token.split('.')[1])).username;
  }

  b64DecodeUnicode(str): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}
