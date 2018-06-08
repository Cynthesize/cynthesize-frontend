import { Component, OnInit } from '@angular/core';
import { BoardNotificationService } from '../../../services/board-notification/board-notification.service';
import { BoardAuthService } from '../../../core/board-auth.service'

@Component({
  selector: 'app-board-review-notification',
  templateUrl: './board-review-notification.component.html',
  styleUrls: ['./board-review-notification.component.css']
})
export class BoardReviewNotificationComponent implements OnInit {

  constructor(public noti: BoardNotificationService,public buser: BoardAuthService) { }

  ngOnInit() {
  }

  acceptReview(e,bb,uid) {
    var project_id = e.target.name;
    this.noti.acceptReview(project_id,bb,uid);
  }

}
