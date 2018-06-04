import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class BoardAuthService {

  public boardmember: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router, private localstorage: LocalStorageService) {
    this.boardmember = this.afAuth.authState;  
  }

  boardLogin(email,password) {
    return Observable.fromPromise( 
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
    );
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.localstorage.set('isBoardLoggedIn', false);
      this.localstorage.remove('boardmemberUid');
      this.localstorage.set('isLoggedIn', false);
      this.localstorage.remove('userUid');
      this.router.navigate(['/']);
    });
  }
}
