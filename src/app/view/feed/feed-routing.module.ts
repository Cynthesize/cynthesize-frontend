import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaFeedComponent } from './idea-feed/idea-feed.component';
import { IssuesFeedComponent } from './issues-feed/issues-feed.component';

const routes: Routes = [
  {
    path: 'ideas',
    component: IdeaFeedComponent
  },
  {
    path: 'issue',
    component: IssuesFeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {}
