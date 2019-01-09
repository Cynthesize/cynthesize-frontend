import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    // do not remove the analytics injection, even if the call in ngOnInit() is removed
    // this injection initializes page tracking through the router
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private i18nService: I18nService,
    private errorHandler: ErrorHandlerService,
    private snackBar: MatSnackBar
  ) {
    this.errorHandler.subj_notification.subscribe(message => {
      let errorMessage = '';
      Object.keys(message['error']).forEach(category => {
        if (typeof (message['error'][category] === 'string')) {
          errorMessage += message['error'][category] + '\n';
        } else if (typeof message['error'][category] === 'object') {
          message['error'][category].forEach((messageString: any) => {
            errorMessage += messageString + '\n';
          });
        }
      });
      this.snackBar.open(errorMessage, 'Okay', {
        duration: 2000
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

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }
}
