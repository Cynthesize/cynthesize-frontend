import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { MatSnackBar } from '@angular/material';

const log = new Logger('Register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  version: string = environment.version;
  errorString: string;
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit() {}

  register() {
    this.isLoading = true;
    this.authenticationService
      .register(this.registerForm.value)
      .pipe(
        finalize(() => {
          this.registerForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug(`${credentials.username} successfully registered in`);
          this.router.navigate(['/login'], { replaceUrl: true });
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

  objectKeys(obj: Object) {
    return Object.keys(obj);
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
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: true
    });
  }
}
