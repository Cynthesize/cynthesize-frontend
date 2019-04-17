import { Component, OnInit, Input } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  @Input() project: any;

  openingRoles = false;
  rolesDataForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}
  displayableName(str: string) {
    str = str.replace(/-/g, ' ');
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  openReviewModel() {
    this.dialog.open(ReviewComponent, {
      width: '250px',
      data: { context: '' }
    });
  }

  askForCollboration() {
    this.rolesDataForm = this.formBuilder.group({
      roles: ['']
    });
    this.openingRoles = true;
  }

  addRoles() {
    this.projectService
      .updateProjectDetails({ roles_opened: this.rolesDataForm.get('roles').value.split(',') }, this.project.id)
      .subscribe(
        (data: any) => {
          this.rolesDataForm.get('roles').setValue('');
          this.openingRoles = false;
          console.log(data);
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
}
