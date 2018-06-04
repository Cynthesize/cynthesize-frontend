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

interface User {
  uid: string;
  email: string;
  photo_url: string;
  display_name: string;
  subscription: Boolean;
  projects_owned: Object;
  projects_upvoted: Array<any>;
  projects_downvoted: Array<any>;
  projects_in_review: Array<any>;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router, private localstorage: LocalStorageService) {
    const isLoggedIn: Boolean = this.localstorage.get('isLoggedIn') as Boolean;
    const isBoardLoggedIn: Boolean = this.localstorage.get('isBoardLoggedIn') as Boolean;
    
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            if(isBoardLoggedIn){
              this.localstorage.set('isLoggedIn', false);
              return Observable.of(null);
            }
            else {
              this.localstorage.set('isLoggedIn', true);
              this.localstorage.set('userUid', user.uid);
              return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            }
          } else {
            this.localstorage.set('isLoggedIn', false);
            return Observable.of(null);
          }
        });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.GoogleoAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.GithuboAuthLogin(provider);
  }

  private GoogleoAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        const userRef = this.afs.doc(`users/${credential.user.uid}`).ref.get()
          .then(doc => {
            if (!doc.exists) {
              this.updateUserData(credential.user);
            }
          });
        this.localstorage.set('isBoardLoggedIn', false);
        this.localstorage.set('isLoggedIn', true);
        this.router.navigate(['dashboard']);
      });
  }

  private GithuboAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        const userRef = this.afs.doc(`users/${credential.user.uid}`).ref.get()
          .then(doc => {
            if (!doc.exists) {
              this.updateUserData(credential.user);
            }
          });
        this.localstorage.set('isBoardLoggedIn', false);
        this.localstorage.set('isLoggedIn', true);
        this.router.navigate(['dashboard']);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      display_name: user.displayName,
      photo_url: user.photoURL,
      subscription: true,
      projects_owned: {},
      projects_downvoted: [],
      projects_in_review: [],
      projects_upvoted: [],
    };
    return userRef.set(data, { merge: true });
  }

  updateUserDataProfile(user, location1, organization1) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      display_name: user.displayName,
      photo_url: user.photoURL,
      subscription: true,
      projects_owned: {},
      projects_downvoted: [],
      projects_in_review: [],
      projects_upvoted: [],
    };
    return userRef.set(data, { merge: true });
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
