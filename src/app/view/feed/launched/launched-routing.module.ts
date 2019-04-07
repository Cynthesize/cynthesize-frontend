import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LaunchedProductsComponent,
  ProjectDialogEntryComponent
} from './launched-products/launched-products.component';

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
