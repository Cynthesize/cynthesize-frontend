import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageService } from 'angular-2-local-storage';
import { Upload } from './Upload';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private localstorge: LocalStorageService, private db: AngularFireDatabase) { }

  private basePath = '/uploads';
  uploads: any;

  upload(upload: Upload) {
    upload.owner_id = this.get_owner_id();
    this.verify_upload(upload);
    const storageRef = firebase.storage().ref();
    const path = `${this.basePath}/${upload.owner_id}/${upload.project_id}`;
    upload.path = path;
    const uploadTask = storageRef.child(`${path}/${upload.file.name}`).put(upload.file);

    uploadTask.then(() => {
      upload.name = upload.file.name;
      this.saveFileData(upload);
    });

    return uploadTask;
  }

  private saveFileData(upload: Upload) {
    this.db.list(`${upload.path}/`).push(upload);
  }

  verify_upload(upload: Upload) {
    if (upload.file.type !== 'image/jpeg' || upload.file.size > 2048576) {
      throw new Error('File not an image or too big');
    }

    if (!upload.owner_id) {
      throw new Error('Unable to get owner_id');
    }

    if (!upload.project_id) {
      throw new Error('project_id not set');
    }
  }

  get_owner_id () {
    return this.localstorge.get('userUid').toString();
  }
}
