import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueComponent } from './view-project/issue/issue.component';

const routes: Routes = [
  {
    path: 'project/:id',
    children: [
      {
        path: ':name',
        component: IssueComponent
      }
    ],
    loadChildren: 'app/view/view-project/view-project.module#ViewProjectModule'
  },
  {
    path: 'feed',
    loadChildren: 'app/view/feed/feed.module#FeedModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, IssueComponent]
})
export class ViewRoutingModule {}
