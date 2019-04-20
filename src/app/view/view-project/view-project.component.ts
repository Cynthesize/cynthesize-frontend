import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '@app/shared/objects';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatDialog } from '@angular/material';
import { AddIssueComponent } from './issue/issue.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  project: Observable<Project>;
  editingDescription = false;
  selectedDate: Date;
  isMobile = false;
  issueActive = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.projectService.getProject(params.id.split('-')[0], params.id.slice(params.id.indexOf('-') + 1)).subscribe(
        (data: any) => {
          this.project = data;
          this.editingDescription = true;
          console.log(this.project);
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    });
    setInterval(() => {
      this.checkRoute();
    }, 1000);
  }

  ngOnInit() {
    this.checkRoute();
  }

  checkRoute() {
    if (this.project) {
      this.issueActive = this.router.url === '/view/project/' + this.project['id'] + '-' + this.project['project_name'];
    }
  }

  fnc(selectedDate: Date) {
    const dates = document.getElementsByClassName('mat-calendar-body-cell-content');
    for (let index = 0; index < dates.length; index++) {
      // Update this according to your needs @neil.
      dates[index]['style']['backgroundColor'] = '#' + (index * 6 + 4000);
    }
  }

  openAddIssueDialog(): void {
    this.dialog.open(AddIssueComponent, {
      width: '900px'
    });
  }
}
