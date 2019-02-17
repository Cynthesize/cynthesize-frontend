import { Component, OnInit, ViewEncapsulation, Input, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Project } from '@app/shared/objects';
import { ErrorHandlerService } from '@app/core/error-handler.service';

const SharedProjectId = '';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueComponent implements OnInit, OnChanges {
  @Input()
  checkpoints: any;
  @Input()
  projectId: any;
  @Input()
  activeCheckpoint: any;
  @Input()
  projectDetails: any;

  issues: Observable<any>;
  checkpointList = {};
  sub: any;

  SharedProjectId = this.projectId;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.projectService
      .fetchIssueInCheckpoint(changes.activeCheckpoint.currentValue, this.projectId)
      .subscribe((data: any) => {
        this.issues = data.data.project_issues;
        console.log(this.activeCheckpoint);
      });
  }

  initAddIssueDialogue() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddIssueComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}

@Component({
  selector: 'app-add-issue',
  templateUrl: 'add-issue.html'
})
export class AddIssueComponent {
  checkpointName = new FormControl('', [Validators.required]);
  issueText = new FormControl('', [Validators.required]);
  checkpoints = [
    { name: 'Design' },
    { name: 'Ideation' },
    { name: 'Market' },
    { name: 'Tech Stack' },
    { name: 'Product Domain' },
    { name: 'MVP' },
    { name: 'Security' },
    { name: 'Funding' },
    { name: 'Team' },
    { name: 'Miscellaneous' }
    // 'Design',
    // 'Ideation',
    // 'Market',
    // 'Tech Stack',
    // 'Product Domain',
    // 'MVP',
    // 'Security',
    // 'Funding',
    // 'Team',
    // 'Miscellaneous'
  ];
  options: any = {
    lineWrapping: true
  };
  constructor(
    public dialogRef: MatDialogRef<AddIssueComponent>,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addIssue() {
    this.projectService
      .addIssue(this.checkpointName.value, this.issueText.value, this.router.url.split('/')[3].split('-')[0])
      .subscribe(
        data => {
          this.onNoClick();
          location.reload();
        },
        error => {
          this.errorHandler.subj_notification.next(error.error.errors[0].message);
        }
      );
  }
}
