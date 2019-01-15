import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IssueComponent } from './issue/issue.component';
import { DetachedIssueComponent } from './issue/detached-issue/detached-issue.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { AddComponent } from '../add/add.component';

@NgModule({
  declarations: [ViewComponent, IssueComponent, DetachedIssueComponent, AddComponent],
  imports: [CommonModule, ViewRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule, CovalentMarkdownModule]
})
export class ViewModule {}
