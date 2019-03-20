import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaFeedComponent, DialogEntryComponent } from './idea-feed/idea-feed.component';
import { IssuesFeedComponent } from './issues-feed/issues-feed.component';

const routes: Routes = [
  {
    path: 'ideas',
    component: IdeaFeedComponent,
    children: [
      {
        path: ':ideaId',
        component: DialogEntryComponent
      }
    ]
  },
  {
    path: 'issue',
    component: IssuesFeedComponent
  },
  {
    path: '**',
    redirectTo: 'ideas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {}
