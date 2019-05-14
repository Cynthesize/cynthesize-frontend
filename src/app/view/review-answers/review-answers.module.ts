import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewAnswersRoutingModule } from './review-answers-routing.module';
import { ReviewAnswersComponent } from './review-answers.component';

@NgModule({
  declarations: [ReviewAnswersComponent],
  imports: [CommonModule, ReviewAnswersRoutingModule]
})
export class ReviewAnswersModule {}
