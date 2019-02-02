import { Component, OnInit, Input, Inject } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-idea-feed',
  templateUrl: './idea-feed.component.html',
  styleUrls: ['./idea-feed.component.scss']
})
export class IdeaFeedComponent implements OnInit {
  length: number;
  ideaList: any;
  constructor(private ideaService: IdeaService, public dialog: MatDialog) {}

  openDialog(idea: any): void {
    const dialogRef = this.dialog.open(IdeaCardComponent, {
      width: 'auto',
      data: { idea }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit() {
    this.ideaService.getTotalIdeaCount().subscribe(data => {
      this.length = data.data.ideas_aggregate.aggregate.count;
    });
    this.getIdeasFromServer({ pageSize: 5, pageIndex: 0 });
  }

  getIdeasFromServer(event: any) {
    this.ideaService.getNIdeas(event.pageSize, event.pageIndex).subscribe(data => {
      this.ideaList = data.data.ideas;
    });
  }
}
@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card/idea-card.component.html',
  styleUrls: ['./idea-card/idea-card.component.scss']
})
export class IdeaCardComponent {
  constructor(public dialogRef: MatDialogRef<IdeaCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
