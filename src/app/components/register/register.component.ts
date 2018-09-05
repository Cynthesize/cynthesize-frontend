import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  constructor(private auth: AuthService) {}
  onRegister(): void {
    this.auth.register(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
