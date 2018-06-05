import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { BoardAuthService } from '../../core/board-auth.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  public boardmember$ = this.boardauthService.boardmember;

  constructor(private authService: AuthService, private boardauthService: BoardAuthService, private router: Router, private localstorage: LocalStorageService) {
  }

  googleLogin() {
    this.authService.googleLogin()
      .then((res) => {
        this.localstorage.set('isBoardLoggedIn', false);
        this.localstorage.set('isLoggedIn', true);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => console.log(err));
  }

  githubLogin() {
    this.authService.githubLogin()
      .then((res) => {
        this.localstorage.set('isBoardLoggedIn', false);
        this.localstorage.set('isLoggedIn', true);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => console.log(err));
  }




  ngOnInit() {
  }

}
