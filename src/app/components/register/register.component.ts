import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = new User();
  regFormGroup: FormGroup;
  hide = true;
  errorEncountered = false;
  errorString: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

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
    this.errorEncountered = false;
    this.user.username = this.regFormGroup.get('username').value;
    this.user.full_name = this.regFormGroup.get('full_name').value;
    this.user.email = this.regFormGroup.get('email').value;
    this.user.password =  this.regFormGroup.get('password').value;
    this.auth.register(this.user)
      .then((response) => {
        if (response.status === 201) {
          this.router.navigate(['/login']);
        }
      })
      .catch((err) => {
        this.errorEncountered = true;
        this.errorString = err._body;
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

  emitMessage() {
  }
}
