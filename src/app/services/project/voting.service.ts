import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { firestore } from 'firebase';

@Injectable()
export class VotingService {

  userDataDocument: AngularFirestoreDocument<any>
  userVotesData: Observable<any>

  constructor(public afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  getUserUpvotedProjectList(user_id) {
    this.userDataDocument = this.afs.collection('user_upvotes').doc(user_id);
    this.userVotesData = this.userDataDocument.snapshotChanges().map(data => {
      return data.payload.data();
    });
    return this.userVotesData;
  }

  getUserDownvotedProjectList(user_id) {
    this.userDataDocument = this.afs.collection('user_downvotes').doc(user_id);
    this.userVotesData = this.userDataDocument.snapshotChanges().map(data => {
      return data.payload.data();
    });
    return this.userVotesData;
  }

  upvoteProject(project_id, user_id): any {
    var docRef = this.afs.firestore.collection('projects').doc(project_id);
    var userRef = this.afs.collection('user_upvotes').doc(user_id);

    userRef.set({ [project_id]: true }, { merge: true })

    this.afs.firestore.runTransaction(transaction =>
      transaction.get(docRef).then(doc => {
        var currentUpvote = doc.data().upvotes;
        transaction.update(docRef, { upvotes: currentUpvote + 1 });
      })).then(() => {
        return 1;
      }).catch(() => {
        return 0;
      });
  }

  downvoteProject(project_id, user_id) {
    var docRef = this.afs.firestore.collection('projects').doc(project_id);
    var userRef = this.afs.collection('user_downvotes').doc(user_id);

    userRef.set({ [project_id]: true }, { merge: true })

    this.afs.firestore.runTransaction(transaction =>
      transaction.get(docRef).then(doc => {
        var currentDownvote = doc.data().downvotes;
        transaction.update(docRef, { upvotes: currentDownvote + 1 });
      })).then(() => {
        return 1;
      }).catch(() => {
        return 0;
      });
  }

  neutralizeUpvote(project_id, user_id) {
    var docRef = this.afs.firestore.collection('projects').doc(project_id);
    var userRef = this.afs.collection('user_upvotes').doc(user_id);

    userRef.update({[project_id] : false});

    this.afs.firestore.runTransaction(transaction =>
      transaction.get(docRef).then(doc => {
        var currentUpvote = doc.data().upvotes;
        transaction.update(docRef, { upvotes: currentUpvote - 1 });
      })).then(() => {
        return 1;
      }).catch(() => {
        return 0;
      });
  }

  neutralizeDownvote(project_id, user_id) {
    var docRef = this.afs.firestore.collection('projects').doc(project_id);
    var userRef = this.afs.collection('user_downvotes').doc(user_id);

    userRef.update({[project_id] : false});

    this.afs.firestore.runTransaction(transaction =>
      transaction.get(docRef).then(doc => {
        var currentDownvote = doc.data().downvotes;
        transaction.update(docRef, { downvotes: currentDownvote - 1 });
      })).then(() => {
        return 1;
      }).catch(() => {
        return 0;
      });
  }
}
