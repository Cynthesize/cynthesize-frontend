import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { Router } from '@angular/router';
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
  addingTimelineEvent = false;
  selectedDate: Date;
  isMobile = false;
  mobileQuery: MediaQueryList;

  descriptionDataForm: FormGroup;
  timelineDataForm: FormGroup;
  private _mobileQueryListener: () => void;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    const routeParams = this.router.url.split('/')[3].split('-');
    const projectId = parseInt(routeParams[0], 10);
    routeParams.splice(0, 1);
    this.projectService.getProject(projectId, routeParams.join('-')).subscribe(
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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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

  initAddTimelineEvent() {
    this.timelineDataForm = this.formBuilder.group({
      eventName: ['']
    });
    this.addingTimelineEvent = true;
  }

  addTimelineEvent() {
    this.project['project_events'][0]['timeline'][this.timelineDataForm.get('eventName').value] = Date.now();
    this.projectService
      .updateProjectEvents({ timeline: this.project['project_events'][0]['timeline'] }, this.project['id'])
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  openAddIssueDialog(): void {
    const dialogRef = this.dialog.open(AddIssueComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
