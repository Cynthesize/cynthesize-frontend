import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'issues',
    loadChildren: 'app/view/issues/issues.module#IssuesModule'
  },
  {
    path: 'project/:id',
    loadChildren: 'app/view/view-project/view-project.module#ViewProjectModule'
  },
  {
    path: 'feed',
    loadChildren: 'app/view/feed/feed.module#FeedModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {}
