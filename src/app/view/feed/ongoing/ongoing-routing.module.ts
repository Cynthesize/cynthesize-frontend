import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OngoingProjectsComponent, ProjectDialogEntryComponent } from './ongoing-projects/ongoing-projects.component';

const routes: Routes = [
  {
    path: '',
    component: OngoingProjectsComponent,
    children: [
      {
        path: ':projectId',
        component: ProjectDialogEntryComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngoingRoutingModule {}
