import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.handleAuthentication();
  }

  ngOnInit() {}
}
