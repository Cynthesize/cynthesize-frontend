import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {

  constructor(private db: AngularFirestore) { }

  fetchFullProjectInfo(id) {
    this.db.collection("projects").doc(id).ref
    .onSnapshot(function(doc) {
      var details = doc.data();
      return details;
    });
  }
}
