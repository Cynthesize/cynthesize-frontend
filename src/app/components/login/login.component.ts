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


  encrypt(password): Promise<string> {
    return this.encryptionService.generateKey(password).then(key => {
      return this.encryptionService.encrypt('plain text', key);
    });
  }


  onLogin(): void {
    console.log('youoouo');
    this.encrypt(this.user.password).then((hashedPassword) => {
      this.user.password = hashedPassword;
    });
    this.auth.login(this.user)
      .then((user) => {
        console.log(user.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }
  ngOnInit() {

    this.userFormGroup = this.fb.group({
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
    return this.userFormGroup.get('email');
  }

  get password() {
    return this.userFormGroup.get('password');
  }
}
