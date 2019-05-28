import { Component, OnInit, Inject } from '@angular/core';
import { ReviewService } from '@app/core/review/review.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-review-responses',
  templateUrl: './review-responses.component.html',
  styleUrls: ['./review-responses.component.scss']
})
export class ReviewResponsesComponent implements OnInit {
  reviewAnswer: any;

  constructor(
    private reviewService: ReviewService,
    public dialogRef: MatDialogRef<ReviewResponsesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewService.fetchReviewAnswersByMentors(this.data.projectId).subscribe((res: any) => {
      this.reviewAnswer = res.data.review_comments;
    });
  }

  ngOnInit() {}
}
