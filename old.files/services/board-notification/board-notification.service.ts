import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import { BoardAuthService } from '../../core/board-auth.service';


@Injectable()
export class BoardNotificationService {
  
  public projects;
  public boardmember$ = this.boardauthService.boardmember;
  constructor(private afs: AngularFirestore,
    private router: Router,
    private localstorge: LocalStorageService,
    private boardauthService: BoardAuthService) { 
      const projref = this.afs.collection('projects', ref => {
      return ref.where('review_status', '==', 'to_be_reviewed')
      });
      this.projects = projref.valueChanges();
    }

  acceptReview(project_id,bemail,buid) {
    const projectRef = this.afs.collection('projects').doc(project_id);
    const projectUpdate = {
      review_status: 'review_in_progress',
      review_board_member_email : bemail,
      review_board_member_uid : buid
    };
    projectRef.update(projectUpdate);

    const userRef = this.afs.collection('boards').doc(buid);
    const usersUpdate = {};
    usersUpdate[`projects_reviewing.` + project_id] = true;

    userRef.update(usersUpdate);
  }

}