import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: ':username',
    component: UserComponent,
    children: [
      {
        path: 'edit',
        loadChildren: 'app/profile/user/edit/edit.module#EditModule'
      },
      {
        path: 'ideas',
        loadChildren: 'app/profile/user/ideas/ideas.module#IdeasModule'
      },
      {
        path: 'projects',
        loadChildren: 'app/profile/user/projects/projects.module#ProjectsModule'
      },
      {
        path: '**',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
