import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent, AddIssueComponent } from './issue.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { DetachedIssueComponent } from './detached-issue/detached-issue.component';

@NgModule({
  declarations: [IssueComponent, AddIssueComponent, DetachedIssueComponent],
  entryComponents: [AddIssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CovalentTextEditorModule,
    CovalentMarkdownModule
  ]
})
export class IssueModule {}
