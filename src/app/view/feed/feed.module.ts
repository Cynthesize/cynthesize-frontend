import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { IdeaFeedComponent, IdeaCardComponent } from './idea-feed/idea-feed.component';
import { IssuesFeedComponent } from './issues-feed/issues-feed.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [IdeaFeedComponent, IssuesFeedComponent, IdeaCardComponent],
  imports: [CommonModule, FeedRoutingModule, SharedModule, MaterialModule, NgxPaginationModule],
  entryComponents: [IdeaCardComponent]
})
export class FeedModule {}
