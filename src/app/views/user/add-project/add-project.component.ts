import { Component, OnInit } from '@angular/core';
import { TextualDetailsService } from '../../../services/add-project/textual-details.service';
import { ProjectDetailService } from '../../../services/project/project-detail.service';
import { FileUploadService } from '../../../services/add-project/file-upload.service';
import { Upload } from '../../../services/add-project/Upload';
import * as firebase from 'firebase/app';


const generatedDocumentId = () => {
  return 'project' + Date.now();
};

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  upload_progress: number;
  text_uploaded = 0;
  upload_error = false;

  constructor(private projectDetailUploader: TextualDetailsService, private fileUploader: FileUploadService) { }

  ngOnInit() {
  }

  addProjectToDatabase(e) {
    e.preventDefault();
    const projectName = e.target.querySelector('#project_name').value;
    const oneLineDescription = e.target.querySelector('#one_line_description').value;
    const projectSummary = e.target.querySelector('#project_summary').value;
    const images_to_upload = e.target.querySelector('#image_input').files;
    const videos_to_upload = e.target.querySelector('#video_input').files;
    let isPublic;

    if (e.target.querySelector('input[name=is_public]:checked')) {
      isPublic = true;
    } else {
      isPublic = false;
    }

    const ProjectDetails = {
      project_name: projectName,
      one_line_description: oneLineDescription,
      project_summary: projectSummary,
      is_public: isPublic,
      uploaded_files: images_to_upload.length + videos_to_upload.length
    };

    const projectId = generatedDocumentId();

    this.upload_files(images_to_upload, videos_to_upload, projectId, ProjectDetails);
  }

  upload_files(image_files, video_files, project_id, ProjectDetails) {
    const total_files = image_files.length + video_files.length;
    this.upload_progress = (total_files === 0) ? 100 : 0;
    let uploaded_bytes = 0;
    let total_bytes = 0;
    let counter = total_files;
    this.text_uploaded = 0;
    this.upload_error = false;

    if (total_files === 0) {
      ProjectDetails['uploads_size'] = total_bytes;
      this.projectDetailUploader.uploadTextualData(ProjectDetails, project_id)
        .then(() => {
          this.text_uploaded = 1;
      });
    }

    try {

      if (video_files.length > 1) {
        throw new Error('You can only upload 1 video');
      }

      for (let i = 0; i < image_files.length; i++) {
        total_bytes += image_files[i].size;
        const current_upload = new Upload(image_files[i], project_id);
        current_upload.owner_id = this.fileUploader.get_owner_id();
        this.fileUploader.verify_upload(current_upload, 'image');
      }

      for (let i = 0; i < video_files.length; i++) {
        total_bytes += video_files[i].size;
        const current_upload = new Upload(video_files[i], project_id);
        current_upload.owner_id = this.fileUploader.get_owner_id();
        this.fileUploader.verify_upload(current_upload, 'video');
      }

      for (let i = 0; i < total_files; i++) {

        let current_upload: Upload;
        let uploader;

        if (i < image_files.length) {
          current_upload = new Upload(image_files[i], project_id);
          uploader = this.fileUploader.upload(current_upload, 'image');
        } else {
          current_upload = new Upload(video_files[i - image_files.length], project_id);
          uploader = this.fileUploader.upload(current_upload, 'video');
        }

        uploader.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>  {
            // upload in progress
            uploaded_bytes -= current_upload.progress;
            current_upload.progress = snapshot['bytesTransferred'];
            uploaded_bytes += current_upload.progress;
            this.upload_progress = uploaded_bytes / total_bytes * 100;
          },
          (error) => {
            // upload failed
            console.log(error);
            this.upload_error = true;
          },
          () => {
            // upload success
            current_upload.name = current_upload.file.name;
            counter -= 1;

            if (counter === 0) {
              ProjectDetails['uploads_size'] = total_bytes;
              this.projectDetailUploader.uploadTextualData(ProjectDetails, project_id)
                .then(() => {
                  this.text_uploaded = 1;
              });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
      this.upload_error = true;
    }
  }
}
