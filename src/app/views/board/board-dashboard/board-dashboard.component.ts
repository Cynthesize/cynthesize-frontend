import { Component, OnInit } from '@angular/core';
import { BoardAuthService } from '../../../core/board-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './board-dashboard.component.html',
  styleUrls: ['./board-dashboard.component.css']
})
export class BoardDashboardComponent implements OnInit {

  constructor(public boardauthService: BoardAuthService) { }

  ngOnInit() {
  }

}
