import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { SelectPipe } from 'apollo-angular';
import { ProfileService } from '@app/core/profile/profile.service';
import { routerTransition } from '@app/animations/router.animations';
import { RequestsComponent } from './header/requests/requests.component';

@Component({
  selector: 'app-shell',
  animations: [routerTransition],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  flag = 0;
  isMentor = JSON.parse(localStorage.getItem('is_mentor'));

  constructor(
    private media: ObservableMedia,
    private dialog: MatDialog,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private profileService: ProfileService
  ) {
    this.profileService.checkIfUserIsMentor().subscribe(
      data => {
        this.isMentor = data.user[0].is_mentor;
        localStorage.setItem('is_mentor', this.isMentor);
      },
      error => {}
    );
  }

  ngOnInit() {
    this.media
      .asObservable()
      .pipe(filter((change: MediaChange) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm'))
      .subscribe(() => this.sidenav.close());
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight &&
      this.router.url === '/view/feed/projects' &&
      event.target.scrollHeight !== this.flag
    ) {
      this.flag = event.target.scrollHeight;
      this.errorHandler.ideaWindowScrolled.next('fetchLaunchedProjects');
    }
  }

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  openModal() {
    this.dialog.open(RequestsComponent, {
      width: 'auto'
    });
  }
}
