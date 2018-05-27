import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of'
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "../../core/auth.service";

interface Project {
  owner: string;
  project_name: string;
  one_line_description: string;
  project_summary: string;
  tags: Array<any>;
}

@Injectable()
export class TextualDetailsService {

  profile: Observable<Project>;

  constructor(private afs: AngularFirestore,
              private router: Router,
              private localstorge: LocalStorageService,
              private Auth: AuthService
            ) {
  }

  uploadTextualData(projectDetails) {
    projectDetails.owner_id = this.localstorge.get('userUid');

    const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${projectDetails.owner_id}`);
    const data: Project = {
      owner: projectDetails.owner_id,
      project_name: projectDetails.project_name,
      one_line_description: projectDetails.one_line_description,
      project_summary: projectDetails.project_summary,
      tags: []
    };
    console.log(data, projectDetails);
    return projectRef.set(data, { merge: true });
  }
}
