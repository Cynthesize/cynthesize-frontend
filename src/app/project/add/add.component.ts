import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  isLinear = false;
  project: FormGroup;
  formNotfilled = false;
  constructor(
    private _formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.project = this._formBuilder.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      currentStage: ['', Validators.required]
    });
  }

  addProject() {
    if (
      this.project.get('projectName').value === '' ||
      this.project.get('projectName').value === '' ||
      this.project.get('projectName').value === ''
    ) {
      this.formNotfilled = true;
    } else {
      const projectDetails = {
        projectName: this.project.get('projectName').value,
        description: this.project.get('description').value,
        currentStage: this.project.get('currentStage').value
      };

      console.log(projectDetails);
      this.projectService
        .addProject(projectDetails)
        .pipe(finalize(() => {}))
        .subscribe(
          (data: any) => {
            const project_name =
              data.data.insert_project.returning['0'].id + '-' + data.data.insert_project.returning['0'].project_name;
            var str = project_name;
            str = str.replace(/\s+/g, '-').toLowerCase();

            this.router.navigate(['/project/' + str + '/view']);
          },
          (error: any) => {
            this.errorHandler.subj_notification.next(error);
          }
        );
    }
  }
}
