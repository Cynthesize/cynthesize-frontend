import { Component, OnInit } from '@angular/core';
import { IssueService } from '@app/core/issue/issue.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-issue-feed',
  templateUrl: './issue-feed.component.html',
  styleUrls: ['./issue-feed.component.scss']
})
export class IssueFeedComponent implements OnInit {
  isLoading = false;
  openIssuesList: any[] = [];

  constructor(private issueService: IssueService, private errorHandler: ErrorHandlerService) {
    this.issueService.fetchOpenIssues().subscribe(
      (data: any) => {
        console.log(data.data.issues);
        this.openIssuesList = data.data.issues;
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }

  ngOnInit() {}
}
