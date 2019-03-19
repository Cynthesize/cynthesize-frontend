import { Component, OnInit, HostListener } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { MatDialog } from '@angular/material';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-idea-feed',
  templateUrl: './idea-feed.component.html',
  styleUrls: ['./idea-feed.component.scss']
})
export class IdeaFeedComponent implements OnInit {
  length = -1;
  currentCount = 0;
  ideasList: any[][] = [];
  activeContext = 'default';
  isLoading = true;

  constructor(private ideaService: IdeaService, public dialog: MatDialog, private errorHandler: ErrorHandlerService) {
    this.errorHandler.ideaWindowScrolled.subscribe(message => {
      if (length !== this.ideasList.length && message === 'fetchIdeas') {
        this.getIdeasFromServer(8, this.currentCount, this.activeContext);
      }
    });
  }

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
    this.getIdeasFromServer(12, 0, this.activeContext);
  }

  getIdeasFromServer(number: number, offset: number, context: any) {
    this.ideaService.getNIdeas(number, offset, context).subscribe(data => {
      this._insert_ideas(data);
    });
  }

  changeContext(context: string) {
    this.activeContext = context;
    this.ideasList = [];
    this.getIdeasFromServer(12, 0, this.activeContext);
    this.currentCount = 0;
    this.isLoading = true;
  }

  private _insert_ideas(data: any) {
    this.currentCount += data.data.ideas.length;
    for (let i = 0; i < data.data.ideas.length; i += 4) {
      const tempArray = [];
      for (let j = 0; j < 4; j++) {
        if (i + j >= data.data.ideas.length) {
          continue;
        }
        tempArray.push(data.data.ideas[i + j]);
      }
      this.ideasList.push(tempArray);
    }
    this.isLoading = false;
  }
}
