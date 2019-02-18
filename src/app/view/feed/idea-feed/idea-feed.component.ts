import { Component, OnInit } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { MatDialog } from '@angular/material';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';

@Component({
  selector: 'app-idea-feed',
  templateUrl: './idea-feed.component.html',
  styleUrls: ['./idea-feed.component.scss']
})
export class IdeaFeedComponent implements OnInit {
  length: number;
  ideaList: any;
  pageIndex = 0;
  pageSize = 5;
  pageEvent: any;
  constructor(private ideaService: IdeaService, public dialog: MatDialog) {}

  openDialog(idea: any): void {
    const dialogRef = this.dialog.open(IdeaCardComponent, {
      panelClass: 'custom-dialog-container',
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
    this.ideaService
      .getNIdeas(event.pageSize, event.pageIndex)
      .subscribe(data => {
        this.ideaList = data.data.ideas;
      });
  }
}
