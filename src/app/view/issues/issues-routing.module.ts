import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueFeedComponent } from './issue-feed.component';

const routes: Routes = [
  {
    path: '',
    component: IssueFeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule {}
