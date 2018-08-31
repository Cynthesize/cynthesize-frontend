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

interface Profile {
  location: string;
  organization: string;
}

@Injectable()
export class ProfileUpdateService {
  profile: Observable<Profile>;

  constructor(private afs: AngularFirestore,
    private router: Router,
    private localstorge: LocalStorageService,
    private Auth: AuthService) { }

  uploadTextualData(profileDetails) {
    profileDetails.owner_id = this.localstorge.get('userUid');
    const userRef = this.afs.collection('users').doc(profileDetails.owner_id);
    const usersUpdate = {
      location: profileDetails.location,
      organization: profileDetails.organization
    };

    return userRef.update(usersUpdate);
  }
}
