import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-project-routing.module';
import { ViewProjectComponent } from './view-project.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IssueComponent, AddIssueComponent } from './issue/issue.component';
import { DetachedIssueComponent } from './issue/detached-issue/detached-issue.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [ViewProjectComponent, IssueComponent, DetachedIssueComponent, AddIssueComponent, ReviewComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    CovalentMarkdownModule,
    CovalentTextEditorModule,
    FormsModule
  ],
  entryComponents: [AddIssueComponent, ReviewComponent]
})
export class ViewProjectModule {}
