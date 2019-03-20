import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { IdeaFeedComponent, DialogEntryComponent } from './idea-feed/idea-feed.component';
import { IssuesFeedComponent } from './issues-feed/issues-feed.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { ShareSheetComponent } from './idea-feed/share-sheet/share-sheet.component';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};

@NgModule({
  declarations: [IdeaFeedComponent, IssuesFeedComponent, DialogEntryComponent, ShareSheetComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
    NgxPaginationModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  entryComponents: [IdeaCardComponent, DialogEntryComponent, ShareSheetComponent],
  providers: [{ provide: MatBottomSheetRef, useValue: {} }, { provide: MAT_BOTTOM_SHEET_DATA, useValue: [] }]
})
export class FeedModule {}
