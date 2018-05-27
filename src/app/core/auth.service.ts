import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of'
import { LocalStorageService } from 'angular-2-local-storage';

interface User {
  uid: string;
  email: string;
  photo_url: string;
  display_name: string;
  subscription: Boolean;
  projects_owned: Array<any>;
  projects_upvoted: Array<any>;
  projects_downvoted: Array<any>;
  projects_in_review: Array<any>;
}


@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,private localstorge: LocalStorageService) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            this.localstorge.set("isLoggedIn", true);
            this.localstorge.set("userUid", user.uid);
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            this.localstorge.set("isLoggedIn", false);
            return Observable.of(null)
          }
        })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.GoogleoAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.GithuboAuthLogin(provider);
  }

  private GoogleoAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
        this.router.navigate(['dashboard'])
      })
  }

  private GithuboAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
        this.router.navigate(['dashboard'])
      })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      display_name: user.displayName,
      photo_url: user.photoURL,
      subscription: true,
      projects_downvoted: [],
      projects_in_review: [],
      projects_upvoted: [],
      projects_owned: []
    }
    return userRef.set(data, { merge: true })
  }

  updateUserDataProfile(user, location1, organization1) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      display_name: user.displayName,
      photo_url: user.photoURL,
      subscription: true,
      projects_downvoted: [],
      projects_in_review: [],
      projects_upvoted: [],
      projects_owned: []
    }
    return userRef.set(data, { merge: true })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.localstorge.set("isLoggedIn", false);
        this.router.navigate(['/']);
    });
  }
}