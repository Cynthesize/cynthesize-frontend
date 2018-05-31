import { Component, OnInit } from '@angular/core';
import { TextualDetailsService } from '../../../services/add-project/textual-details.service';
import { ProjectDetailService } from '../../../services/project/project-detail.service';
import { ImageUploadService } from '../../../services/add-project/image-upload.service';
import { Upload } from '../../../services/add-project/Upload';
import * as firebase from 'firebase/app';
import { snapshotChanges } from 'angularfire2/database';


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

  constructor(private projectDetailUploader: TextualDetailsService, private imageUploader: ImageUploadService) { }

  ngOnInit() {
  }

  addProjectToDatabase(e) {
    e.preventDefault();
    const projectName = e.target.querySelector('#project_name').value;
    const oneLineDescription = e.target.querySelector('#one_line_description').value;
    const projectSummary = e.target.querySelector('#project_summary').value;
    const files_to_upload = e.target.querySelector('#file_input').files;
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
      uploaded_files: files_to_upload.length || 0
    };

    const projectId = generatedDocumentId();

    this.upload_files(files_to_upload, projectId);

    this.projectDetailUploader.uploadTextualData(ProjectDetails, projectId)
      .then(() => {
        this.text_uploaded = 1;
    });
  }

  upload_files(files, project_id) {
    this.upload_progress = (files.length === 0) ? 100 : 0;
    let uploaded_bytes = 0;
    let total_bytes = 0;
    for (let i = 0; i < files.length; i++) {
      total_bytes += files[i].size;
      const current_upload = new Upload(files[i], project_id);

      try {
        const uploader = this.imageUploader.upload(current_upload);
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
          }
        );
      } catch (error) {
        this.upload_error = true;
      }
    }
  }

}
