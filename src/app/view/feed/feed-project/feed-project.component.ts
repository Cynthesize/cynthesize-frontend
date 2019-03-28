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
  project: any;
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
          this.project = data.data.launched_projects[0];
          console.log(this.project, this.data);
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    }
  }
}
