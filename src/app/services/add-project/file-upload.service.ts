import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageService } from 'angular-2-local-storage';
import { Upload } from './Upload';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private localstorge: LocalStorageService, private db: AngularFireDatabase) { }

  private basePath = '/uploads';
  uploads: any;

  upload(upload: Upload, type: string) {
    upload.owner_id = this.get_owner_id();
    this.verify_upload(upload, type);
    const storageRef = firebase.storage().ref();
    const path = `${this.basePath}/${upload.owner_id}/${upload.project_id}/${type}s`;
    upload.path = path;
    const uploadTask = storageRef.child(`${path}/${upload.file.name}`).put(upload.file);

    uploadTask.then(() => {
      upload.name = upload.file.name;
      firebase.storage().ref(`${path}/${upload.file.name}`).getDownloadURL().then(url => {
        upload.url = url;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      });
    });

    return uploadTask;
  }

  private saveFileData(upload: Upload) {
    const type = upload.path.split('/')[4];
    this.db.list(`${this.basePath}/${upload.project_id}/${type}`).push(upload);
  }

  verify_upload(upload: Upload, type: string) {

    const MAX_IMAGE_SIZE = 2000000;  // 2 MB
    const MAX_VIDEO_SIZE = 20000000; // 20 MB
    const image = 'image/jpeg';
    const video = 'video/mp4';
    const file = upload.file;

    if (type === 'image') {
      if (file.type !== image) {
        throw new Error('File not a valid jpg');
      }
      if (file.size > MAX_IMAGE_SIZE) {
        throw new Error('File exceeds maximum size');
      }
    } else if (type === 'video') {
      if (file.type !== video) {
        throw new Error('File not a valid mp4');
      }
      if (file.size > MAX_VIDEO_SIZE) {
        throw new Error('File exceeds maximum size');
      }
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
