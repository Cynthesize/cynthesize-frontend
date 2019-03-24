import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchedProductsComponent } from './launched-products/launched-products.component';
import { ProjectDialogEntryComponent } from '../ongoing/ongoing-projects/ongoing-projects.component';

const routes: Routes = [
  {
    path: '',
    component: LaunchedProductsComponent,
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
export class LaunchedRoutingModule {}
