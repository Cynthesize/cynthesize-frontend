import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Project {
  project_id: string;
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
  tasksCollection: AngularFirestoreDocument<Project>;
  tasks: Observable<Project>;
  taskDoc: AngularFirestoreDocument<Project>;

  constructor(public afs: AngularFirestore, private db: AngularFireDatabase) {
    // this.tasksCollection = this.afs.collection('projects').doc(this.id);
    // // this.tasks = this.afs.collection('tasks').valueChanges();
    // this.tasks = this.tasksCollection.snapshotChanges().map(changes => {
    //   return changes.payload.data() as project;
    //   });
    }

    getTasks(id) {
      this.tasksCollection = this.afs.collection('projects').doc(id);
      // this.tasks = this.afs.collection('tasks').valueChanges();
      this.tasks = this.tasksCollection.snapshotChanges().map(changes => {
        return changes.payload.data() as Project;
        });
    return this.tasks;
  }

  get_videos(project_id) {
    return this.db.list(`/uploads/${project_id}/videos`).snapshotChanges();
  }

}
