import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { IdeaFeedComponent } from './idea-feed/idea-feed.component';
import { IssuesFeedComponent } from './issues-feed/issues-feed.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};

@NgModule({
  declarations: [IdeaFeedComponent, IssuesFeedComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPaginationModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  entryComponents: [IdeaCardComponent]
})
export class FeedModule {}
