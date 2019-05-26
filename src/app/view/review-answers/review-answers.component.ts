import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@app/core/review/review.service';

@Component({
  selector: 'app-review-answers',
  templateUrl: './review-answers.component.html',
  styleUrls: ['./review-answers.component.scss']
})
export class ReviewAnswersComponent implements OnInit {
  checkpoints = ['Ideation', 'Prototyping', 'Feedback', 'Launching', 'Funding'];
  constructor(private reviewService: ReviewService) {}

  ngOnInit() {}
}
