import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardAuthService } from '../../../core/board-auth.service';
import { AuthService } from '../../../core/auth.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-board-login',
  templateUrl: './board-login.component.html',
  styleUrls: ['./board-login.component.css']
})
export class BoardLoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };
 
  constructor(private boardauthService: BoardAuthService, private router: Router,private localstorage: LocalStorageService,private afAuth: AngularFireAuth, private authservice: AuthService) {
  }

  LoginWithEmail(e) {
    e.preventDefault();
    const Email = e.target.querySelector('#email').value;
    const Password = e.target.querySelector('#password').value;
    
    this.boardauthService.boardLogin(Email,Password)
      .subscribe(
        () => this.func()
      );
  }

  func() {
    this.localstorage.set('isBoardLoggedIn', true);
    this.boardauthService.boardmember = this.afAuth.authState;
    this.localstorage.set('isLoggedIn', false);
    this.router.navigate(['/'])
  }

  ngOnInit() {
  }

}
