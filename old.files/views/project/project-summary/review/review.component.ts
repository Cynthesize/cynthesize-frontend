import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ReviewService } from '../../../../services/review/review.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() project_id: string;
  review_status: string;

  constructor(private db: AngularFireDatabase, private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.get_project(this.project_id).get().then((doc) => {
      this.review_status =  doc.data()['review_status'];
    });
  }

  send_for_review() {
    this.reviewService.set_review_status(this.project_id, 'to_be_reviewed')
    .then(() => {
      this.review_status = 'to_be_reviewed';
    });
  }

}
