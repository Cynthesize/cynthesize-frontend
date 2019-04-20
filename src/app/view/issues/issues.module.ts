import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssueFeedComponent } from './issue-feed.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IssueFeedComponent, IssueCardComponent],
  imports: [CommonModule, IssuesRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, MaterialModule]
})
export class IssuesModule {}
