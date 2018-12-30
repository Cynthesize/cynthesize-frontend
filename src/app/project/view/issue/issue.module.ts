import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IssueComponent],
  imports: [CommonModule, IssueRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule]
})
export class IssueModule {}
