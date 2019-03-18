import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(private media: ObservableMedia, private router: Router, private errorHandler: ErrorHandlerService) {}

  ngOnInit() {
    this.media
      .asObservable()
      .pipe(filter((change: MediaChange) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm'))
      .subscribe(() => this.sidenav.close());
  }
  @HostListener('scroll', ['$event'])
  onWindowScroll(event: any) {
    const max = document.documentElement.scrollHeight;
    if (event.target.scrollTop + 35 === max && this.router.url === '/view/feed/ideas') {
      this.errorHandler.ideaWindowScrolled.next('fetchIdeas');
    }
  }
}
