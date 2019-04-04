import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  isLinear = false;
  project: FormGroup;
  formNotfilled = false;
  isPageLoading = false;
  projectDescription = '';
  options: any = {
    lineWrapping: true
  };
  tags: any[] = [];
  stages: String[] = [
    'Ideation',
    'Execution Ongoing',
    'MVP Ready',
    'Pre-production',
    'Beta Testing',
    'Production ready',
    'In Production'
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private _formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.project = this._formBuilder.group({
      projectName: ['', Validators.required],
      abstract: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(150)]],
      currentStage: ['', Validators.required],
      website: ['', Validators.required],
      isPublic: false,
      isPrivate: true
    });
  }

  ngOnInit() {}

  addProject() {
    this.isPageLoading = true;
    if (
      this.project.get('projectName').value === '' ||
      this.project.get('description').value === '' ||
      this.project.get('currentStage').value === ''
    ) {
      this.formNotfilled = true;
    } else {
      const projectDetails = {
        projectName: this.project.get('projectName').value.toLowerCase(),
        description: this.project.get('description').value,
        currentStage: this.project.get('currentStage').value
      };

      projectDetails.projectName = projectDetails.projectName.replace(/\s+/g, ' ').trim();
      this.projectService
        .addProject(projectDetails)
        .pipe(
          finalize(() => {
            this.isPageLoading = false;
          })
        )
        .subscribe(
          (data: any) => {
            this.isPageLoading = false;
            const project_name =
              data.data.insert_projects.returning['0'].id + '-' + data.data.insert_projects.returning['0'].project_name;
            let str = project_name;
            str = str.replace(/\s+/g, '-').toLowerCase();
            this.router.navigate(['/view/project/' + str]);
          },
          (error: any) => {
            this.isPageLoading = false;
            this.errorHandler.subj_notification.next(error);
          }
        );
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tags: any): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
