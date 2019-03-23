import { Component, OnInit } from '@angular/core';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedProjectComponent } from '../../feed-project/feed-project.component';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { ShareSheetComponent } from '@app/shared/share-sheet/share-sheet.component';

@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.scss']
})
export class OngoingProjectsComponent implements OnInit {
  length = -1;
  currentCount = 0;
  projectsList: any[] = [];
  activeContext = 'newest';
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private bottomSheet: MatBottomSheet
  ) {
    this.errorHandler.ideaWindowScrolled.subscribe(message => {
      if (this.length >= this.projectsList.length && message === 'fetchongoingProjects') {
        this.isLoading = true;
        this.getIdeasFromServer(4, this.currentCount, this.activeContext);
      }
    });
  }

  openDialog(idea: any): void {
    const dialogRef = this.dialog.open(FeedProjectComponent, {
      panelClass: 'custom-dialog-container',
      width: 'auto',
      data: { idea }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit() {
    this.projectService.getTotalOngoingProjectsCount().subscribe(data => {
      this.length = data.data.projects_aggregate.aggregate.count;
    });
    this.getIdeasFromServer(9, this.currentCount, this.activeContext);
  }

  getIdeasFromServer(number: number, offset: number, context: any) {
    this.projectService.getNOngoingProjects(number, offset, context).subscribe(data => {
      this.currentCount += data.data.projects.length;
      this.projectsList.push(...data.data.projects);
      this.isLoading = false;
    });
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

  changeContext(context: string) {
    this.activeContext = context;
    this.projectsList = [];
    this.getIdeasFromServer(12, 0, this.activeContext);
    this.currentCount = 0;
    this.isLoading = true;
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
      width: '250px',
      data: this.router.url.split('/')[this.router.url.split('/').length - 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
