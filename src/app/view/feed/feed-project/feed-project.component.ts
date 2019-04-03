import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-feed-project',
  templateUrl: './feed-project.component.html',
  styleUrls: ['./feed-project.component.scss']
})
export class FeedProjectComponent implements OnInit {
  project: any = {};
  constructor(
    public dialogRef: MatDialogRef<FeedProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (this.data['activityType'] === 'launched') {
      this.projectService.fetchBasicProjectDetails(this.data['activityId']).subscribe(
        data => {
          Object.keys(data.data.launched_projects[0].projectsByparentProjectId).forEach(key => {
            this.project[key] = data.data.launched_projects[0].projectsByparentProjectId[key];
          });
          this.project['id'] = data.data.launched_projects[0]['id'];
          this.project['likes'] = data.data.launched_projects[0]['likes'];
          this.project['userByowner'] = data.data.launched_projects[0]['userByowner'];
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    } else if (this.data['activityType'] === 'ongoing') {
      this.projectService.fetchOngoingProjectDetails(this.data['activityId']).subscribe(
        data => {
          this.project = data.data.projects[0];
          this.project['id'] = this.project.launchedProjectsBylaunchedId['id'];
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    }
  }
}
