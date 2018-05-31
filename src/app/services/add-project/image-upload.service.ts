import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Upload } from './Upload';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private localstorge: LocalStorageService) { }

  private basePath = '/uploads';
  uploads: any;

  upload(upload: Upload) {
    const owner_id = this.localstorge.get('userUid');
    upload.owner_id = owner_id.toString();
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.owner_id}/${upload.project_id}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
        console.log(upload.progress);
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.name = upload.file.name;
      }
    );
  }
}
