import { Component, OnInit, HostListener } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { IdeaComponent } from '@app/view/idea/idea.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareSheetComponent } from '@app/shared/share-sheet/share-sheet.component';

@Component({
  selector: 'app-idea-feed',
  templateUrl: './idea-feed.component.html',
  styleUrls: ['./idea-feed.component.scss']
})
export class IdeaFeedComponent implements OnInit {
  length = -1;
  currentCount = 0;
  ideasList: any[] = [];
  activeContext = 'newest';
  isLoading = true;

  constructor(
    private ideaService: IdeaService,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private bottomSheet: MatBottomSheet
  ) {
    this.errorHandler.ideaWindowScrolled.subscribe(message => {
      if (this.length >= this.ideasList.length && message === 'fetchIdeas') {
        this.isLoading = true;
        this.getIdeasFromServer(4, this.currentCount, this.activeContext);
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
    this.getIdeasFromServer(9, this.currentCount, this.activeContext);
  }

  getIdeasFromServer(number: number, offset: number, context: any) {
    console.log('ideas init');
    this.ideaService.getNIdeas(number, offset, context).subscribe(data => {
      this.currentCount += data.data.ideas.length;
      this.ideasList.push(...data.data.ideas);
      this.isLoading = false;
    });
  }

  openShareSheet(): void {
    this.bottomSheet.open(ShareSheetComponent, {
      data: {
        facebookUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
        twitterUrl: 'https://twitter.com/home?status=',
        linkedInUrl: 'https://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source='
      }
    });
  }

  changeContext(context: string) {
    this.activeContext = context;
    this.ideasList = [];
    this.getIdeasFromServer(12, 0, this.activeContext);
    this.currentCount = 0;
    this.isLoading = true;
  }
}
@Component({
  template: ''
})
export class DialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(IdeaComponent, {
      width: '250px',
      data: this.router.url.split('/')[this.router.url.split('/').length - 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
