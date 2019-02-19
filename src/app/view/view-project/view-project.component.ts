import { Component, OnInit, ElementRef } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '@app/shared/objects';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  project: Observable<Project>;
  currentActiveBar = 'Home';

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.getProject();
  }

  ngOnInit() {}

  getProject() {
    this.projectService
      .getProject(this.router.url.split('/')[3].split('-')[0])
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.router.navigate(['not-found']);
          } else {
            this.project = data[0];
          }
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
  setBarActive(checkpointName: string) {
    this.currentActiveBar = checkpointName;
    this.router.navigate(['/view/project', this.router.url.split('/')[3].split('-')[0], this.currentActiveBar]);
  }

  initCheckpoint(el: any) {
    this.currentActiveBar = el;
  }
}
