import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { finalize, startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  allTags = [
    'Artificial Intelligence',
    'Productivity',
    'Home Automation',
    'Internet of Things',
    'Analytics',
    'Web Application',
    'Android',
    'iOS',
    'Blockchain',
    'Health and Fitness',
    'Social Media',
    'Security',
    'Robotics',
    'Chat Messaging',
    'Video Conferencing',
    'Augmented Reality',
    'VR',
    'Dating',
    'Music',
    'Books'
  ];

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
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice()))
    );
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
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
