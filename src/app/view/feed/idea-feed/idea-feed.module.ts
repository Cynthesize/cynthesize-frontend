import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeaFeedRoutingModule } from './idea-feed-routing.module';
import { IdeaFeedComponent, DialogEntryComponent } from './idea-feed.component';
import { SharedModule } from '@app/shared';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { MaterialModule } from '@app/material.module';
import { MatBottomSheetModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};

@NgModule({
  declarations: [IdeaFeedComponent, DialogEntryComponent],
  imports: [
    CommonModule,
    IdeaFeedRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
    NgxPaginationModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  entryComponents: [IdeaCardComponent, DialogEntryComponent]
})
export class IdeaFeedModule {}
