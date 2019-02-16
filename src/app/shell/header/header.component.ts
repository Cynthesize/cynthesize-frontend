import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { AuthenticationService, I18nService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input()
  sidenav: MatSidenav;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
  }

  get username(): string {
    return localStorage.getItem('username');
  }
  get profilepPic(): string {
    return localStorage.getItem('user_profile_pic');
  }
}
