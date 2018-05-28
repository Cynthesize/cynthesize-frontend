import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

interface Project {
  owner: string;
  project_name: string;
  one_line_description: string;
  project_summary: string;
  tags: Array<any>;
}

@Injectable()
export class NewsfeedService {
  constructor(private db: AngularFireDatabase) { }


    getProjects(batch, lastKey?) {
      let Query =  {
            orderByKey: true,
            limitToFirst: batch,
          }

    if (lastKey) Query['startAt'] = lastKey;
    console.log(this.db.list('/projects').valueChanges());
    return this.db.list('/projects').valueChanges();
  }
}