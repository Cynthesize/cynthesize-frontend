import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet } from '@angular/material';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { ShareSheetComponent } from '@app/shared/share-sheet/share-sheet.component';

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
    public projectService: ProjectService,
    private errorHandler: ErrorHandlerService,
    private bottomSheet: MatBottomSheet
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openShareSheet(): void {
    this.bottomSheet.open(ShareSheetComponent, {
      data: {
        facebookUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
        twitterUrl: 'https://twitter.com/home?status=',
        linkedInUrl: 'https://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source='
      }
    });
  }
  ngOnInit() {
    this.projectService.fetchBasicProjectDetails(this.data['activityId']).subscribe(
      data => {
        this.project = data.data.projects[0];
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}
