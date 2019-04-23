import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { FeedProjectComponent } from '../../feed-project/feed-project.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-launched-products',
  templateUrl: './launched-products.component.html',
  styleUrls: ['./launched-products.component.scss']
})
export class LaunchedProductsComponent implements OnInit {
  length = -1;
  currentCount = 0;
  projectList: any[] = [];
  activeContext = 'newest';
  isLoading = true;
  additionalInfo: string;
  applying = false;
  constructor(private projectService: ProjectService, private errorHandler: ErrorHandlerService) {
    this.errorHandler.ideaWindowScrolled.subscribe(message => {
      if (this.length >= this.projectList.length && message === 'fetchLaunchedProjects') {
        this.isLoading = true;
        this.getlaunchedProjectsFromServer(4, this.currentCount, this.activeContext);
      }
    });
  }

  ngOnInit() {
    this.projectService.getTotalLaunchedProjectsCount().subscribe(data => {
      this.length = data.data.projects_aggregate.aggregate.count;
    });
    this.getlaunchedProjectsFromServer(6, this.currentCount, this.activeContext);
  }

  getlaunchedProjectsFromServer(number: number, offset: number, context: any) {
    this.projectService.getNProjects(number, offset, context).subscribe(data => {
      this.currentCount += data.data.projects.length;
      this.projectList.push(...data.data.projects);
      this.isLoading = false;
    });
  }
  changeContext(context: string) {
    this.activeContext = context;
    this.projectList = [];
    this.currentCount = 0;
  }

  displayableName(str: string) {
    str = str.replace(/-/g, ' ');
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  applyForCollab(role: string, projectId: number) {
    this.projectService.applyForProjectCollaboration(role, projectId, this.additionalInfo).subscribe(
      data => {
        this.additionalInfo = '';
        this.errorHandler.subj_notification.next('Successfully applied for role: ' + role);
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}

@Component({
  template: ''
})
export class ProjectDialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FeedProjectComponent, {
      width: 'auto',
      data: {
        activityId: this.router.url.split('/')[this.router.url.split('/').length - 1],
        activityType: this.router.url.split('/')[this.router.url.split('/').length - 2]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
