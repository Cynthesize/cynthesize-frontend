import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { EncryptionService } from 'angular-encryption-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    ) {}

  encrypt(password): Promise<string> {
    return this.encryptionService.generateKey(password).then(key => {
      return this.encryptionService.encrypt('plain text', key);
    });
  }

  ngOnInit() {

    this.regFormGroup = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
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
    this.encrypt(this.user.password).then((hashedPassword) => {
      this.user.password = hashedPassword;
    });
    this.user.username = this.regFormGroup.get('username').value;
    this.user.full_name = this.regFormGroup.get('full_name').value;
    this.user.email = this.regFormGroup.get('email').value;

    this.auth.register(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
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
