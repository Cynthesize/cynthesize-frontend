import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchedProductsComponent } from './launched-products/launched-products.component';

const routes: Routes = [
  {
    path: '',
    component: LaunchedProductsComponent
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
