import { Component, OnInit, Input } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { ReviewResponsesComponent } from './review-responses/review-responses.component';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  @Input() project: any;
  projectHome = false;
  step = -1;
  openingRoles = false;
  rolesDataForm: FormGroup;
  descriptionDataForm: FormGroup;
  editingDescription = false;
  canEdit = false;
  currentStage = '';
  isWaiting: boolean;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.canEdit = localStorage.getItem('username') === this.project.user.username;
    this.initDescriptionForm();
    this.isWaiting = this._getCurrentStageStatusWaiting();
  }

  openReviewModel() {
    this.dialog.open(ReviewComponent, {
      width: 'auto',
      panelClass: 'review-modal-card',
      data: {
        context: this.isWaiting ? 'waiting' : this.project.current_stage,
        projectId: this.project.id
      }
    });
  }

  seeReviewResponses() {
    this.dialog.open(ReviewResponsesComponent, {
      width: 'auto',
      panelClass: 'review-modal-card',
      data: {
        projectId: this.project.id,
        projectName: this.project.project_name
      }
    });
  }

  askForCollboration() {
    this.rolesDataForm = this.formBuilder.group({
      roles: [this.project.roles_opened.join(',')]
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
          this.errorHandler.subj_notification.next('Updated!');
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  initDescriptionForm() {
    this.descriptionDataForm = this.formBuilder.group({
      xyz: [this.project.project_descriptions[0].xyz],
      distinguishing_factor: [this.project.project_descriptions[0].distinguishing_factor],
      progress: [this.project.project_descriptions[0].progress],
      why_product: [this.project.project_descriptions[0].why_product],
      revenue_model: [this.project.project_descriptions[0].revenue_model],
      future_scope: [this.project.project_descriptions[0].future_scope],
      wow_factor: [this.project.project_descriptions[0].wow_factor]
    });
  }

  updateDescription(projectId: number, e: Event) {
    e.preventDefault();
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
        this.errorHandler.subj_notification.next('Updated!');
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  private _getCurrentStageStatusWaiting() {
    switch (this.project.current_stage) {
      case 'ideation_stage':
        if (this.project.stage_ideations.length > 0) {
          if (this.project.stage_ideations[0].is_applied) {
            return true;
          }
        }
        break;
      case 'prototype_development_stage':
        if (this.project.stage_product_developments.length > 0) {
          if (this.project.stage_product_developments[0].is_applied) {
            return true;
          }
        }
        break;
      case 'consumer_feedback_stage':
        if (this.project.stage_consumer_feedbacks.length > 0) {
          if (this.project.stage_consumer_feedbacks[0].is_applied) {
            return true;
          }
        }
        break;
      case 'launching_stage':
        if (this.project.stage_launchings.length > 0) {
          if (this.project.stage_launchings[0].is_applied) {
            return true;
          }
        }
        break;
      case 'funding_stage':
        if (this.project.stage_fundings.length > 0) {
          if (this.project.stage_fundings[0].is_applied) {
            return true;
          }
        }
        break;
      default:
        return false;
    }
  }
}
