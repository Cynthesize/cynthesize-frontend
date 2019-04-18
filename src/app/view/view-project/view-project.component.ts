import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '@app/shared/objects';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ReviewComponent } from './review/review.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AddIssueComponent } from './issue/issue.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  project: Observable<Project>;
  editingDescription = false;
  selectedDate: Date;
  isMobile = false;
  issueActive = false;

  descriptionDataForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.projectService.getProject(params.id.split('-')[0], params.id.slice(params.id.indexOf('-') + 1)).subscribe(
        (data: any) => {
          this.project = data;
          this.editingDescription = true;
          this.initDescriptionForm();
          console.log(this.project);
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    });
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (this.project) {
        this.issueActive =
          this.router.url === '/view/project/' + this.project['id'] + '-' + this.project['project_name'];
      }
    });
  }

  fnc(selectedDate: Date) {
    const dates = document.getElementsByClassName('mat-calendar-body-cell-content');
    for (let index = 0; index < dates.length; index++) {
      // Update this according to your needs @neil.
      dates[index]['style']['backgroundColor'] = '#' + (index * 6 + 4000);
    }
  }

  initDescriptionForm() {
    this.descriptionDataForm = this.formBuilder.group({
      xyz: [this.project['project_descriptions'][0].xyz],
      distinguishing_factor: [this.project['project_descriptions'][0].distinguishing_factor],
      progress: [this.project['project_descriptions'][0].progress],
      why_product: [this.project['project_descriptions'][0].why_product],
      revenue_model: [this.project['project_descriptions'][0].revenue_model],
      future_scope: [this.project['project_descriptions'][0].future_scope],
      wow_factor: [this.project['project_descriptions'][0].wow_factor]
    });
  }

  updateDescription(projectId: number) {
    const descriptionDataToBeUpdated = {
      xyz: this.descriptionDataForm.get('xyz').value,
      distinguishing_factor: this.descriptionDataForm.get('distinguishing_factor').value,
      progress: this.descriptionDataForm.get('progress').value,
      why_product: this.descriptionDataForm.get('why_product').value,
      revenue_model: this.descriptionDataForm.get('revenue_model').value,
      future_scope: this.descriptionDataForm.get('future_scope').value,
      wow_factor: this.descriptionDataForm.get('wow_factor').value
    };
    this.projectService.updateProjectDescription(descriptionDataToBeUpdated, projectId).subscribe(
      (updatedDescription: any) => {
        this.project['project_descriptions'][0] = updatedDescription.data.update_project_description.returning[0];
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  openAddIssueDialog(): void {
    this.dialog.open(AddIssueComponent, {
      width: '900px'
    });
  }
}
