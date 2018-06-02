import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

export interface project {
  owner: string;
  project_name: string;
  one_line_description: string;
  project_summary: string;
  is_public: Boolean;
  uploaded_files: number;
  uploads_size: number;
  tags: Array<any>;
  comments: Object;
  upvotes: Number;
  downvotes: Number;
  date_created: string;
}

@Injectable()
export class ProjectDetailService {
  tasksCollection: AngularFirestoreDocument<project>;
  tasks: Observable<project>;
  taskDoc: AngularFirestoreDocument<project>;
  id: string;

  constructor(public afs:AngularFirestore) {
    // this.tasksCollection = this.afs.collection('projects').doc(this.id);
    // // this.tasks = this.afs.collection('tasks').valueChanges();
    // this.tasks = this.tasksCollection.snapshotChanges().map(changes => {
    //   return changes.payload.data() as project;
    
    //   });
    };
    getTasks(id) {
      this.tasksCollection = this.afs.collection('projects').doc(id);
      // this.tasks = this.afs.collection('tasks').valueChanges();
      this.tasks = this.tasksCollection.snapshotChanges().map(changes => {
        return changes.payload.data() as project;
      
        });
    return this.tasks; 
  }
}
