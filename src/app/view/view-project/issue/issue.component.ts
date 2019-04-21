import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { IssueService } from '@app/core/issue/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueComponent implements OnInit {
  checkpointName: string;
  projectId: number;
  projectName: string;
  issues: Observable<any>;
  unresolvedIssues: number;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {
    this.route.parent.params.subscribe(params => {
      this.projectId = params.id.split('-')[0];
      this.projectName = params.id.slice(params.id.indexOf('-') + 1);
    });
    this.route.params.subscribe(params => {
      this.checkpointName = params.checkpoint_name;
      this.issueService.fetchIssueInCheckpoint(params.checkpoint_name, this.projectId).subscribe(
        (data: any) => {
          this.issues = data.data.issues;
          this.unresolvedIssues = data.data.issues_aggregate.aggregate.count;
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    });
  }

  ngOnInit() {}

  issueResolution(issueId: number, resolution: boolean) {
    this.issueService.markIssueResolvedOrUnsolved(issueId, resolution).subscribe(
      (data: any) => {
        this.issues.forEach(issue => {
          if (issue.id === issueId) {
            issue.is_resolved = data.data.update_issues.returning[0].is_resolved;
          }
        });
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
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
    private issueService: IssueService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addIssue() {
    this.issueService
      .addIssue(this.checkpointName.value, this.issueText.value, this.router.url.split('/')[3].split('-')[0])
      .subscribe(
        data => {
          this.onNoClick();
          location.reload();
        },
        error => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
}
