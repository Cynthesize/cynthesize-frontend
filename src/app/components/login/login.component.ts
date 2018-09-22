import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = false;
  user: User = new User();
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    ) { }

  formGroup: FormGroup;

  onLogin(): void {
    this.auth.login(this.user)
      .then((user) => {
        console.log(user.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }
  ngOnInit() {

    this.formGroup = this.fb.group({
      email: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]]
    });

  }

  get username() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }
}
