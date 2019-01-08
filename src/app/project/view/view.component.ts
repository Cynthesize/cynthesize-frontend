import { Component, OnInit, ElementRef } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '@app/shared/objects';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  project: Observable<Project>;
  checkpointList = {};
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
      .getProject(this.router.url.split('/')[2])
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.router.navigate(['not-found']);
          } else {
            this.project = data;
            this.checkpointList = this._getCheckpointData(data['area_of_issues_open'][0]);
          }
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  _getCheckpointData(recievedObject: Object) {
    const _tempObject = {};
    Object.keys(recievedObject).forEach(checkpoint => {
      if (recievedObject[checkpoint].length > 0) {
        _tempObject[checkpoint] = recievedObject[checkpoint].length;
      }
    });
    return _tempObject;
  }

  isBarActive() {
    return this.router.url.split('/')[4] || 'Home';
  }

  initCheckpoint(el: any) {
    this.currentActiveBar = el;
  }
}
