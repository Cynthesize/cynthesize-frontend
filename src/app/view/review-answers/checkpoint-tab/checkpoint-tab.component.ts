import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReviewService } from '@app/core/review/review.service';
import {
  IDEATION_STAGE_QUESTIONS,
  PRODUCT_DEVELOPMENT_STAGE_QUESTIONS,
  CONSUMER_FEEDBACK_AND_ITERATION_STAGE_QUESTIONS,
  LAUNCHING_AND_TESTING_STAGE_QUESTIONS,
  FUNDING_STAGE_QUESTIONS
} from '@app/shared/constants';
import { MatDialog } from '@angular/material';
import { ActionModalComponent } from './action-modal/action-modal.component';

@Component({
  selector: 'app-checkpoint-tab',
  templateUrl: './checkpoint-tab.component.html',
  styleUrls: ['./checkpoint-tab.component.scss']
})
export class CheckpointTabComponent implements OnInit {
  answers: any;
  questionsObject: any;
  currentActiveStage = '';
  constructor(private router: Router, private reviewService: ReviewService, public dialog: MatDialog) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.currentActiveStage = val.url.split('/')[3];

        if (this.currentActiveStage === 'Ideation') {
          this.questionsObject = IDEATION_STAGE_QUESTIONS;
        } else if (this.currentActiveStage === 'Prototyping') {
          this.questionsObject = PRODUCT_DEVELOPMENT_STAGE_QUESTIONS;
        } else if (this.currentActiveStage === 'Feedback') {
          this.questionsObject = CONSUMER_FEEDBACK_AND_ITERATION_STAGE_QUESTIONS;
        } else if (this.currentActiveStage === 'Launching') {
          this.questionsObject = LAUNCHING_AND_TESTING_STAGE_QUESTIONS;
        } else if (this.currentActiveStage === 'Funding') {
          this.questionsObject = FUNDING_STAGE_QUESTIONS;
        }

        this.reviewService.getReviewAnswers(val.url.split('/')[3]).subscribe(
          (data: any) => {
            this.answers =
              data.data.stage_ideation ||
              data.data.stage_product_development ||
              data.data.stage_consumer_feedback ||
              data.data.stage_launching ||
              data.data.stage_funding;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }

  ngOnInit() {}

  displayableName(str: string) {
    str = str.replace(/-/g, ' ');
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  openMentorActionModal(isApproved: boolean, reviewRef: any) {
    this.dialog.open(ActionModalComponent, {
      data: {
        project_name: this.displayableName(reviewRef.project.project_name),
        isApproved: isApproved,
        stageId: reviewRef.id,
        stageType: this.currentActiveStage
      }
    });
  }
}
