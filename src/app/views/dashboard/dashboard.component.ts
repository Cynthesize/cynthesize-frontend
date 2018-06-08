import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AlertService } from '../../core/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService,private alertService: AlertService) { }

  ngOnInit() {
        this.alertService.showAlert(true, "Dashboard has been laoded.");
  }

}
