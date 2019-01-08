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
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.project = this._formBuilder.group({
      projectName: ['', Validators.required],
      projectId: [''],
      description: ['', Validators.required],
      currentStage: ['', Validators.required]
    });
  }

  generateProjectId() {
    const id = this.project.get('projectName').value + Math.round(Date.now() / 1000000);
    this.project.get('projectId').setValue(id);
    return id;
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
        projectId: this.project.get('projectId').value,
        description: this.project.get('description').value,
        currentStage: this.project.get('currentStage').value
      };
      console.log(projectDetails);
      this.projectService
        .addProject(projectDetails)
        .pipe(finalize(() => {}))
        .subscribe(
          (data: any) => {
            this.router.navigate(['/project/' + data.project_id + '/view']);
          },
          (error: any) => {
            this.errorHandler.subj_notification.next(error);
          }
        );
    }
  }
}
