import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewAnswersComponent } from './review-answers.component';
import { CheckpointTabComponent } from './checkpoint-tab/checkpoint-tab.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewAnswersComponent,
    children: [
      {
        path: ':checkpointName',
        component: CheckpointTabComponent
      }
    ],
    data: { title: 'Cynthesize | Stage Review' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewAnswersRoutingModule {}
