import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { EncryptionService } from 'angular-encryption-service';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = false;
  user: any = new User();
  userFormGroup: FormGroup;
  errorEncountered = false;
  errorString: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  onLogin(): void {
    this.errorEncountered = false;
    this.user.username = this.userFormGroup.get('username').value;
    this.user.password = this.userFormGroup.get('password').value;
    console.log(this.user);
    this.auth.login(this.user)
      .then((user) => {
        localStorage.setItem('token', user.json().token);
        this.router.navigate(['/idea/add-idea']);
      })
      .catch((err) => {
        this.errorEncountered = true;
        this.errorString = err._body;
      });
  }
  ngOnInit() {

    this.userFormGroup = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]]
    });

  }

  get username() {
    return this.userFormGroup.get('username');
  }

  get password() {
    return this.userFormGroup.get('password');
  }
}
