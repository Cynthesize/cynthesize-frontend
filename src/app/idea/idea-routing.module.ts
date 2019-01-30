import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ViewIdeaComponent } from './view-idea/view-idea.component';
import { IdeaFeedComponent } from './idea-feed/idea-feed.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: ViewIdeaComponent,
    data: { title: extract('Idea Details') }
  },
  {
    path: 'feed',
    component: IdeaFeedComponent,
    data: { title: extract('Cynthesize | Ideas') }
  },
  {
    path: '**',
    redirectTo: 'add',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IdeaRoutingModule {}
