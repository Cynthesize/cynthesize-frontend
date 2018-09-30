import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { EncryptionService } from 'angular-encryption-service';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = false;
  user: any = new User();
  userFormGroup: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private encryptionService: EncryptionService,
  ) { }

  encrypt(password, string): Promise<string> {
    return this.encryptionService.generateKey(password).then(key => {
      return this.encryptionService.encrypt(string, key);
    });
  }

  onLogin(): void {
    this.user.username = this.userFormGroup.get('username').value;
    this.user.password = this.userFormGroup.get('password').value;
    console.log(this.user);
    this.auth.login(this.user)
      .then((user) => {
        console.log(user.json());
        localStorage.setItem('token', user.json().token);
      })
      .catch((err) => {
        console.log(err);
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
