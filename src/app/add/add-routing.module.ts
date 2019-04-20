import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { MentorComponent } from './mentor/mentor.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'project', component: AddProjectComponent }, { path: 'mentor', component: MentorComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule {}
