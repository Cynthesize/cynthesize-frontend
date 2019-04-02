import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIdeaComponent } from './add-idea/add-idea.component';
import { AddProjectComponent } from './add-project/add-project.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'idea', component: AddIdeaComponent }, { path: 'project', component: AddProjectComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule {}
