import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReviewService } from '@app/core/review/review.service';
import { IDEATION_STAGE_QUESTIONS } from '@app/shared/constants';
import { MatDialog } from '@angular/material';
import { ActionModalComponent } from './action-modal/action-modal.component';

@Component({
  selector: 'app-checkpoint-tab',
  templateUrl: './checkpoint-tab.component.html',
  styleUrls: ['./checkpoint-tab.component.scss']
})
export class CheckpointTabComponent implements OnInit {
  answers: any;
  questionsObject = IDEATION_STAGE_QUESTIONS;
  currentActiveStage = '';
  constructor(private router: Router, private reviewService: ReviewService, public dialog: MatDialog) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.currentActiveStage = val.url.split('/')[3];
        this.reviewService.getReviewAnswers(val.url.split('/')[3]).subscribe(
          (data: any) => {
            console.log(data);
            this.answers =
              data.data.stage_ideation ||
              data.data.stage_ideation ||
              data.data.stage_ideation ||
              data.data.stage_ideation ||
              data.data.stage_ideation;
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
