import { Component, OnInit, Input } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectHomeComponent implements OnInit {
  @Input() project: any;
  projectHome = false;
  step = -1;
  openingRoles = false;
  rolesDataForm: FormGroup;
  descriptionDataForm: FormGroup;
  editingDescription = false;
  currentStage: string;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] }
  };
  public barChartLabels: Label[] = [
    'Ideation',
    'Marketing',
    'Prototype Development',
    'Testing and Launching',
    'Consumer Feedback',
    'Funding'
  ];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [10, 0, 0, 0, 0, 0], label: 'Ideation Stage', backgroundColor: '#FFA500', borderColor: '#FFA500' },
    { data: [0, 20, 0, 0, 0, 0], label: 'Marketing Stage', backgroundColor: '#B27A12', borderColor: '#B27A12' },
    {
      data: [0, 0, 30, 0, 0, 0],
      label: 'Prototype Development Stage',
      backgroundColor: '#12B216',
      borderColor: '#12B216'
    },
    {
      data: [0, 0, 0, 40, 0, 0],
      label: 'Testing and Launching Stage',
      backgroundColor: '#B2248C',
      borderColor: '#B2248C'
    },
    { data: [0, 0, 0, 0, 50, 0], label: 'Consumer Feedback Stage', backgroundColor: '#334CFF', borderColor: '#334CFF' },
    { data: [0, 0, 0, 0, 0, 60], label: 'Funding Stage', backgroundColor: '#FFA500', borderColor: '#FFA500' }
  ];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.initDescriptionForm();
    this.currentStage = this._getCurrentStageForTheProject();
  }
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
      width: 'auto',
      data: { context: this.currentStage, projectId: this.project.id }
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
          console.log(data);
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
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
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  /**
   * getCurrentStageForTheProject
   */
  private _getCurrentStageForTheProject(): string {
    if (
      this.project.stage_ideations[0].is_applied ||
      this.project.stage_marketings[0].is_applied ||
      this.project.stage_product_developments[0].is_applied ||
      this.project.stage_launchings[0].is_applied ||
      this.project.stage_consumer_feedbacks[0].is_applied ||
      this.project.stage_fundings[0].is_applied
    ) {
      return 'waiting';
    }

    if (!this.project.stage_ideations[0].is_passed) {
      return 'ideation_stage';
    } else if (this.project.stage_ideations[0].is_passed && !this.project.stage_marketings[0].is_passed) {
      return 'marketing_stage';
    } else if (!this.project.stage_product_developments[0].is_passed && this.project.stage_marketings[0].is_passed) {
      return 'prototype_development_stage';
    } else if (!this.project.stage_launchings[0].is_passed && this.project.stage_product_developments[0].is_passed) {
      return 'launching_and_testing_stage';
    } else if (!this.project.stage_consumer_feedbacks[0].is_passed && this.project.stage_launchings[0].is_passed) {
      return 'consumer_feedback_stage';
    } else if (!this.project.stage_fundings[0].is_passed && this.project.stage_consumer_feedbacks[0].is_passed) {
      return 'funding_stage';
    } else {
      return 'ideation_stage';
    }
  }
}
