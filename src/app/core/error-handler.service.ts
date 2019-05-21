import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public subj_notification: Subject<any> = new Subject();
  public ideaWindowScrolled: Subject<any> = new Subject();

  constructor() {}
}
