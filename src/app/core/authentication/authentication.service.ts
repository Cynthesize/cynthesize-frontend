import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<any>;
  token$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private userService: UserService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.token$ = this.afAuth.idToken.pipe(
      map(data => {
        return data;
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    localStorage.setItem('id_token', credential.credential['idToken']);
    this.userService.HandleUserData(credential);
    return this.updateUserData(credential.user);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.clear();
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }
}
