import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { IssuesFeedComponent } from './issues-feed/issues-feed.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { MatBottomSheetModule } from '@angular/material';
import { FeedProjectComponent } from './feed-project/feed-project.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};

@NgModule({
  declarations: [IssuesFeedComponent, FeedProjectComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
    NgxPaginationModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  entryComponents: [FeedProjectComponent]
})
export class FeedModule {}
