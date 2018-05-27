import { Component, OnInit } from '@angular/core';
import { TextualDetailsService } from "../../../services/add-project/textual-details.service";
import { ProjectDetailService } from '../../../services/project/project-detail.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private projectDetailUploader: TextualDetailsService) { }

  ngOnInit() {
  }

  addProjectToDatabase(e) {
    e.preventDefault();
    const projectName = e.target.querySelector('#project_name').value;
    const oneLineDescription = e.target.querySelector('#one_line_description').value;
    const projectSummary = e.target.querySelector('#project_summary').value;
    
    var ProjectDetails = {
      project_name: projectName,
      one_line_description: oneLineDescription,
      project_summary: projectSummary
    };

    this.projectDetailUploader.uploadTextualData(ProjectDetails);
    
  }
}
