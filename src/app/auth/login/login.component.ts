import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { MatSnackBar } from '@angular/material';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = environment.version;
  errorString: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    if (authenticationService.isAuthenticated()) {
      router.navigate(['idea']);
    }
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error => {
          this.errorString = '';
          for (let i = 0; i < Object.keys(error.error).length; i++) {
            this.errorString +=
              Object.keys(error.error)
                [i].toString()
                .charAt(0)
                .toUpperCase() +
              Object.keys(error.error)
                [i].toString()
                .slice(1) +
              ': ' +
              error.error[Object.keys(error.error)[i]]
                .toString()
                .charAt(0)
                .toUpperCase() +
              error.error[Object.keys(error.error)[i]].toString().slice(1) +
              '\n';
          }
          this.snackBar.open(this.errorString, 'Ok', {
            duration: 10000
          });
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
