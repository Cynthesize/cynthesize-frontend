import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class VotingService {

  constructor(public afs: AngularFirestore, private db: AngularFireDatabase) {
    }
  
  getUserVotedProjectList(user_id) {
    var userList = []
    this.afs.firestore.collection('user').doc(user_id).onSnapshot(data => {
      userList = data.data().projects_upvoted;
    });
    return userList;
  }

  upvoteProject(project_id, user_id) : any {
    var docRef = this.afs.firestore.collection('projects').doc(project_id);
    var userRef = this.afs.firestore.collection('users').doc(user_id);

    this.afs.firestore.runTransaction(transaction => 
      transaction.get(userRef).then(doc => {
        var projectsUpvoted = doc.data().projects_upvoted.concat(project_id);
        console.log(projectsUpvoted);
        
        transaction.update(userRef, {projects_upvoted: projectsUpvoted})
      })).then(() => {console.log('user array entered');return 1;})
      .catch(() => {console.log('user array not entered');return 0;})

    this.afs.firestore.runTransaction(transaction => 
      transaction.get(docRef).then(doc => {
        var currentUpvote = doc.data().upvotes;
        transaction.update(docRef, {upvotes: currentUpvote + 1});
      })).then(() => {return 1;})
      .catch(() => {return 0;});
  }
  
  downvoteProject(project_id) {
    var docRef = this.afs.firestore.collection('projects').doc(project_id);
    this.afs.firestore.runTransaction(transaction => 
      transaction.get(docRef).then(doc => {
        var currentUpvote = doc.data().downvotes + 1;
        transaction.update(docRef, {downvotes: currentUpvote});
      })).then(() => {
        console.log('Upvoted!');
        return 1;
      }).catch(() => {
        console.log('Upvoted!');
        return 0;
      });
  }
}
