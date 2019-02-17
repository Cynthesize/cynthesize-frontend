import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProjectComponent } from './view-project.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectComponent
  }

  // {
  //   path: '/:name',
  //   component: ViewProjectComponent
  //   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {}
