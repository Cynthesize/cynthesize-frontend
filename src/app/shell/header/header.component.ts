import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { AuthenticationService } from '@app/core';
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
  isMentor = JSON.parse(localStorage.getItem('is_mentor'));

  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private profileService: ProfileService
  ) {
    this.profileService.checkIfUserIsMentor().subscribe(
      data => {
        this.isMentor = data.user[0].is_mentor;
        localStorage.setItem('is_mentor', this.isMentor);
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
