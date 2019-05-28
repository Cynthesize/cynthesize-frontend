import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {
  @Input() issue: any;

  constructor(public projectService: ProjectService) {}

  ngOnInit() {}
}
