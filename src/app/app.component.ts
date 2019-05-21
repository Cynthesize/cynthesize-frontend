import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { environment } from '@env/environment';
import { Logger, AuthenticationService } from '@app/core';
import { ErrorHandlerService } from './core/error-handler.service';
import { MatSnackBar } from '@angular/material';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    // do not remove the analytics injection, even if the call in ngOnInit() is removed
    // this injection initializes page tracking through the router
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private errorHandler: ErrorHandlerService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.authService.handleAuthentication();
    angulartics2GoogleAnalytics.startTracking();
    this.errorHandler.subj_notification.subscribe(message => {
      let messageString = '';
      if (typeof message === 'string') {
        messageString = message;
      } else if (!message.message.indexOf('Network')) {
        messageString =
          'There appears to be something wrong with your internet connection. Please check and try again.';
      } else {
        messageString = message.message;
      }
      this.snackBar.open(messageString, 'Okay', {
        duration: 15000
      });
    });
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    this.angulartics2GoogleAnalytics.eventTrack(environment.version, { category: 'App initialized' });
  }
}
