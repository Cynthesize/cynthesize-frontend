import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaFeedComponent, DialogEntryComponent } from './idea-feed.component';

const routes: Routes = [
  {
    path: '',
    component: IdeaFeedComponent,
    children: [
      {
        path: ':ideaId',
        component: DialogEntryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeaFeedRoutingModule {}
