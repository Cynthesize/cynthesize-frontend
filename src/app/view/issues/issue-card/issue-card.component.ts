import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {
  @Input() issue: any;

  constructor() {}

  ngOnInit() {}

  displayableName(str: string) {
    str = str.replace(/-/g, ' ');
    str = str.replace(/_/g, ' ');
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
}
