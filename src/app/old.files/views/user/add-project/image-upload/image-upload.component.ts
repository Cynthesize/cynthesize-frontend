import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../../services/add-project/file-upload.service';
import { Upload } from '../../../../services/add-project/Upload';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private fileUploader: FileUploadService) { }

  upload_files(files) {
    for (let i = 0; i < files.length; i++) {
      const current_upload = new Upload(files[i], 'project_id');
      this.fileUploader.upload(current_upload, 'image');
    }
  }

  ngOnInit() {
  }

}
