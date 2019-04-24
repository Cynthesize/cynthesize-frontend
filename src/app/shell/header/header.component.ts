import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatDialog } from '@angular/material';
import { AuthenticationService, I18nService } from '@app/core';
import { RequestsComponent } from './requests/requests.component';
import { ProfileService } from '@app/core/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input()
  sidenav: MatSidenav;
  isMentor = localStorage.getItem('is_mentor');

  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private profileService: ProfileService
  ) {
    this.profileService.checkIfUserIsMentor().subscribe(
      data => {
        console.log(data);
        // this.isMentor = data.data.returning[0].user
      },
      error => {}
    );
  }

  ngOnInit() {}

  get username(): string {
    return localStorage.getItem('username');
  }
  get profilepPic(): string {
    return localStorage.getItem('user_profile_pic');
  }

  openModal() {
    this.dialog.open(RequestsComponent, {
      width: 'auto'
    });
  }
}
