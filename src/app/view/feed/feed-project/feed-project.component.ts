import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '@app/core/project/project.service';

@Component({
  selector: 'app-feed-project',
  templateUrl: './feed-project.component.html',
  styleUrls: ['./feed-project.component.scss']
})
export class FeedProjectComponent implements OnInit {
  idea: any;

  constructor(
    public dialogRef: MatDialogRef<FeedProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private projectService: ProjectService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
