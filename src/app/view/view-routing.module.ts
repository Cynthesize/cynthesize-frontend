import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProjectModule } from './view-project/view-project.module';

const routes: Routes = [
  {
    path: 'project/:id',
    loadChildren: 'app/view/view-project/view-project.module#ViewProjectModule'
  },
  {
    path: 'project/:id/:name',
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
