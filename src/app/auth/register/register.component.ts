import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';

const log = new Logger('Register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  version: string = environment.version;
  error: Array<string> = [];
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
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
          for (let i = 0; i < Object.keys(error.error).length; i++) {
            this.error = error.error[Object.keys(error.error)[i]];
          }
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
