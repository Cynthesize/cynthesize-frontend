import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReviewService } from '@app/core/review/review.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {
  reviewComment = 'Looks good to me!';
  constructor(
    public dialogRef: MatDialogRef<ActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reviewService: ReviewService,
    private errorHandler: ErrorHandlerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
  actionOnCheckpoint() {
    this.reviewService
      .actionOnCheckpointByMentor(this.reviewComment, this.data.stageId, this.data.stageType, this.data.isApproved)
      .subscribe(
        (data: any) => {
          this.dialogRef.close();
          this.errorHandler.subj_notification.next('Review Submitted!');
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
}
