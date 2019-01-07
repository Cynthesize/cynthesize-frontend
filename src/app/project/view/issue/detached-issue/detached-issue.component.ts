import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detached-issue',
  templateUrl: './detached-issue.component.html',
  styleUrls: ['./detached-issue.component.scss']
})
export class DetachedIssueComponent implements OnInit {
  @Input()
  issue: any;

  constructor() {}

  ngOnInit() {}
}
