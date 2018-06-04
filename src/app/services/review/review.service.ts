import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private afs: AngularFirestore) { }

  get_project(project_id) {
    return this.afs.collection('projects').doc(project_id).ref;
  }
  
  set_review_status(project_id, status) {
    const project = this.afs.collection('projects').doc(project_id);
    return project.update({
      review_status: status
    })
    .then(function() {
      // success marking for review
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
  }
}
