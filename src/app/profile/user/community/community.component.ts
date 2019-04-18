import { Component, OnInit } from '@angular/core';
import { ShareSheetComponent } from '@app/shared/share-sheet/share-sheet.component';
import { IdeaService } from '@app/core/idea/idea.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { ProfileService } from '@app/core/profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ideas',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  ideasList: any[] = [];
  isLoading = true;

  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) {}

  openDialog(idea: any): void {
    const dialogRef = this.dialog.open(IdeaCardComponent, {
      panelClass: 'custom-dialog-container',
      width: 'auto',
      data: { idea }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit() {
    this.getIdeasFromServer();
  }

  getIdeasFromServer() {
    this.profileService.getUserIdeas(this.router.url.split('/')[2]).subscribe(data => {
      this.ideasList.push(...data.data.user[0].ideassByowner);
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
}
