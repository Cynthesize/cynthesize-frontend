import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProjectComponent } from './view-project.component';
import { IssueComponent } from './issue/issue.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectComponent,
    children: [
      {
        path: 'issues/:checkpoint_name',
        component: IssueComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {}
