import { Component, OnInit } from '@angular/core';
import { TextualDetailsService } from "../../../services/add-project/textual-details.service";
import { ProjectDetailService } from '../../../services/project/project-detail.service';
import { ImageUploadService } from '../../../services/add-project/image-upload.service';
import { Upload } from '../../../services/add-project/Upload';


var generatedDocumentId = () => {
  return 'project' + Date.now();
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private projectDetailUploader: TextualDetailsService, private imageUploader: ImageUploadService) { }

  ngOnInit() {
  }

  addProjectToDatabase(e) {
    e.preventDefault();
    const projectName = e.target.querySelector('#project_name').value;
    const oneLineDescription = e.target.querySelector('#one_line_description').value;
    const projectSummary = e.target.querySelector('#project_summary').value;
    var isPublic;
    
    if (e.target.querySelector('input[name=is_public]:checked')) {
      isPublic = true;
    } else {
      isPublic = false;
    }
    
    var ProjectDetails = {
      project_name: projectName,
      one_line_description: oneLineDescription,
      project_summary: projectSummary,
      is_public: isPublic
    };
    var projectId = generatedDocumentId();

    this.upload_files(e.target.querySelector('#file_input').files, projectId);

    this.projectDetailUploader.uploadTextualData(ProjectDetails, projectId);
  }

  upload_files(files, project_id) {
    for (let i = 0; i < files.length; i++) {
      const current_upload = new Upload(files[i], project_id);
      this.imageUploader.upload(current_upload);
    }
  }

}
