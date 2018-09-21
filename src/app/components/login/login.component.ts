import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';

import { User } from '../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService) { }
  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  ngOnInit() {
  }

}
