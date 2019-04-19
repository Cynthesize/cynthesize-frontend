import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {
  IDEATION_STAGE_QUESTIONS,
  MARKETING_STAGE_QUESTIONS,
  PRODUCT_DEVELOPMENT_STAGE_QUESTIONS,
  LAUNCHING_AND_TESTING_STAGE_QUESTIONS,
  CONSUMER_FEEDBACK_AND_ITERATION_STAGE_QUESTIONS,
  FUNDING_STAGE_QUESTIONS
} from 'app/shared/constants';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  questionsObject = {};

  constructor(
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {
    switch (data.context) {
      case 'ideation_stage':
        this.questionsObject = IDEATION_STAGE_QUESTIONS;
        break;
      case 'marketing_stage':
        this.questionsObject = MARKETING_STAGE_QUESTIONS;
        break;
      case 'prototype_development_stage':
        this.questionsObject = PRODUCT_DEVELOPMENT_STAGE_QUESTIONS;
        break;
      case 'launching_and_testing_stage':
        this.questionsObject = LAUNCHING_AND_TESTING_STAGE_QUESTIONS;
        break;
      case 'consumer_feedback_stage':
        this.questionsObject = CONSUMER_FEEDBACK_AND_ITERATION_STAGE_QUESTIONS;
        break;
      case 'funding_stage':
        this.questionsObject = FUNDING_STAGE_QUESTIONS;
        break;
      default:
        this.questionsObject = IDEATION_STAGE_QUESTIONS;
        break;
    }
    const formFields = {};
    Object.keys(this.questionsObject).forEach(fieldNames => {
      formFields[fieldNames] = [''];
    });
    this.reviewForm = this.fb.group(formFields);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  submitReviewForm() {
    const answersObject = this.reviewForm.value;
    answersObject['project_id'] = this.data.projectId;
    this.projectService.applyForReview(answersObject, this.data.context).subscribe(
      (arg: any) => {
        console.log(arg);
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}
