import { Component, OnInit, ElementRef } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '@app/shared/objects';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  project: Observable<Project>;
  checkpointList = {};
  currentActiveBar = 'Home';

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService
      .getProject(this.router.url.split('/')[2])
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data === {}) {
            this.router.navigate(['404']);
          }
          this.project = data;
          this.checkpointList = this._getCheckpointData(data['area_of_issues_open'][0]);
        },
        (error: any) => {
          console.log(error);
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
