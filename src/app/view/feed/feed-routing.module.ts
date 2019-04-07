import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ideas',
    loadChildren: 'app/view/feed/idea-feed/idea-feed.module#IdeaFeedModule'
  },
  {
    path: 'projects',
    loadChildren: 'app/view/feed/launched/launched.module#LaunchedModule'
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
