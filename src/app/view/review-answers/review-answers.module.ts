import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewAnswersRoutingModule } from './review-answers-routing.module';
import { ReviewAnswersComponent } from './review-answers.component';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { CheckpointTabComponent } from './checkpoint-tab/checkpoint-tab.component';
import { ActionModalComponent } from './checkpoint-tab/action-modal/action-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReviewAnswersComponent, CheckpointTabComponent, ActionModalComponent],
  imports: [CommonModule, ReviewAnswersRoutingModule, MaterialModule, SharedModule, ReactiveFormsModule, FormsModule],
  entryComponents: [ActionModalComponent]
})
export class ReviewAnswersModule {}
