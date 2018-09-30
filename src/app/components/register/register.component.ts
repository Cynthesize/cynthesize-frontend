import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { EncryptionService } from 'angular-encryption-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = new User();
  regFormGroup: FormGroup;
  hide = true;

  constructor(
    private auth: AuthService,
    private encryptionService: EncryptionService,
    private fb: FormBuilder
  ) { }

  encrypt(password, string): Promise<string> {
    return this.encryptionService.generateKey(password).then(key => {
      return this.encryptionService.encrypt(string, key);
    });
  }

  ngOnInit() {

    this.regFormGroup = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      full_name: ['', [
        Validators.required,
      ]]
    });

  }

  onRegister(): void {
    this.user.username = this.regFormGroup.get('username').value;
    this.user.full_name = this.regFormGroup.get('full_name').value;
    this.user.email = this.regFormGroup.get('email').value;
    this.user.password =  this.regFormGroup.get('password').value;
    this.auth.register(this.user)
      .then((respose) => {
        if (respose.status === 201) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get username() {
    return this.regFormGroup.get('username');
  }

  get firstName() {
    return this.regFormGroup.get('full_name');
  }

  get email() {
    return this.regFormGroup.get('email');
  }

  get password() {
    return this.regFormGroup.get('password');
  }
}
