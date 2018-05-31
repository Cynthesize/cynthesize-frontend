import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../../../../services/add-project/image-upload.service';
import { Upload } from '../../../../services/add-project/Upload';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private imageUploader: ImageUploadService) { }

  upload_files(files) {
    for (let i = 0; i < files.length; i++) {
      const current_upload = new Upload(files[i], 'project_id');
      this.imageUploader.upload(current_upload);
    }
  }

  ngOnInit() {
  }

}
