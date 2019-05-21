import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { environment } from '@env/environment';
import { AuthenticationService } from '@app/core';

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

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}
}
