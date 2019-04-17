import { Component, OnInit, Input } from '@angular/core';
import { ReviewComponent } from '../review/review.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  @Input() project: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  displayableName(str: string) {
    str = str.replace(/-/g, ' ');
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  openReviewModel() {
    this.dialog.open(ReviewComponent, {
      width: '250px',
      data: { context: '' }
    });
  }
}
