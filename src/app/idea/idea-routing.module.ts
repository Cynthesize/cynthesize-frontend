import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { IdeaComponent } from './add-idea/idea.component';
import { ViewIdeaComponent } from './view-idea/view-idea.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: 'add',
    component: IdeaComponent,
    data: { title: extract('Cynthesize | Add Idea') }
  },
  {
    path: 'view/:id',
    component: ViewIdeaComponent,
    data: { title: extract('Idea Details') }
  },
  {
    path: '**',
    redirectTo: 'add'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IdeaRoutingModule {}
