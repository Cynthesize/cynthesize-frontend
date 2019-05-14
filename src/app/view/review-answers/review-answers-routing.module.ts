import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewAnswersComponent } from './review-answers.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewAnswersComponent,
    data: { title: 'Cynthesize | Stage Review' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewAnswersRoutingModule {}
