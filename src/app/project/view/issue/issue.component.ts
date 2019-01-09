import { Component, OnInit, ViewEncapsulation, Input, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Project } from '@app/shared/objects';
import { ErrorHandlerService } from '@app/core/error-handler.service';

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

  projectDetails: Observable<Project>;
  issues: Observable<any>;
  checkpointList = {};
  sub: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    // this.sub = this.activeCheckpoint.subscribe(params => {
    //   const term = params['issueName'];
    //   this.getProject(term);
    //   return term;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getProject(changes.activeCheckpoint.currentValue);
  }

  getProject(activeCheckpoint: string) {
    Object.keys(this.checkpoints).forEach(checkpoint => {
      if (checkpoint === activeCheckpoint) {
        let idList = '';
        this.checkpoints[activeCheckpoint].forEach((id: any) => {
          idList += id + ',';
        });
        console.log(idList);
        this.projectService
          .fetchIdea(idList)
          .pipe(finalize(() => {}))
          .subscribe(
            (issueObject: any) => {
              this.issues = issueObject;
            },
            (error: any) => {
              this.errorHandler.subj_notification.next(error);
            }
          );
      }
    });
  }

  // const checkpointName = this.activeCheckpoint;
  // this.projectService
  //   .getProject(this.router.url.split('/')[2])
  //   .pipe(finalize(() => { }))
  //   .subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       project = data;
  //       this.projectDetails = data;
  //       this.checkpointList = this._getCheckpointData(data['area_of_issues_open'][0]);
  //       Object.keys(this.checkpointList).forEach(checkpoint => {
  //         if (checkpoint === checkpointName) {
  //           let idList = '';
  //           data['area_of_issues_open'][0][checkpointName].forEach((id: any) => {
  //             idList += id + ',';
  //           });
  //           this.projectService
  //             .fetchIdea(idList)
  //             .pipe(finalize(() => { }))
  //             .subscribe(
  //               (issueObject: any) => {
  //                 this.issues = issueObject;
  //               },
  //               (error: any) => {
  //                 this.errorHandler.subj_notification.next(error);
  //               }
  //             );
  //         }
  //       });
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  _getCheckpointData(recievedObject: Object) {
    const _tempObject = {};
    Object.keys(recievedObject).forEach(checkpoint => {
      if (recievedObject[checkpoint].length > 0) {
        _tempObject[checkpoint] = recievedObject[checkpoint].length;
      }
    });
    return _tempObject;
  }

  getPageName() {
    return decodeURI(this.router.url.split('/')[4] || 'Home');
  }

  initAddIssueDialogue() {
    console.log('Modal init');
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddIssueComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
    'Design',
    'Ideation',
    'Market',
    'Tech Stack',
    'Product Domain',
    'MVP',
    'Security',
    'Funding',
    'Team',
    'Miscellaneous'
  ];
  options: any = {
    lineWrapping: true
  };
  constructor(
    public dialogRef: MatDialogRef<AddIssueComponent>,
    private projectService: ProjectService,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addIssue() {
    this.projectService.addIssue(this.checkpointName.value, this.issueText.value, this.projectId).subscribe(data => {
      this.onNoClick();
      location.reload();
    });
  }
}
