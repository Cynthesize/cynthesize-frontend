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
  issues = {};
  isLoading = true;
  unresolvedIssues: number;
  resolvedIssues: number;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {
    this.route.parent.params.subscribe(params => {
      this.projectId = params.id.split('-')[0];
      this.projectName = params.id.slice(params.id.indexOf('-') + 1);
    });
    this.issueService.fetchIssueInCheckpoint(this.projectId).subscribe(
      (data: any) => {
        data.data.issues.forEach((issue: any) => {
          if (this.issues[issue.checkpoint_name]) {
            this.issues[issue.checkpoint_name].push(issue);
          } else {
            this.issues[issue.checkpoint_name] = [issue];
          }
        });
        console.log(this.issues);
        this.updateIssuesCounts();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  ngOnInit() {}

  scrollToCheckpoint(checkpointName: string) {
    document.getElementById(checkpointName).scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }

  issueResolution(issueId: number, resolution: boolean, checkpointName: string) {
    this.issueService.markIssueResolvedOrUnsolved(issueId, resolution).subscribe(
      (data: any) => {
        this.issues[checkpointName].forEach((issue: any) => {
          if (issue.id === issueId) {
            issue.is_resolved = data.data.update_issues.returning[0].is_resolved;
          }
        });
        this.updateIssuesCounts();
      },
      error => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  updateIssuesCounts() {
    this.unresolvedIssues = 0;
    this.resolvedIssues = 0;
    Object.keys(this.issues).forEach((issueCategory: any) => {
      this.issues[issueCategory].forEach((issue: any) => {
        if (issue.is_resolved) {
          this.resolvedIssues++;
        } else {
          this.unresolvedIssues++;
        }
      });
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
  errorMessage: string;
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
    if (this.checkpointName.value && this.issueText.value) {
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
    } else {
      this.errorMessage = 'Please select the checkpoint name and type in your issue completely.';
    }
  }
}
