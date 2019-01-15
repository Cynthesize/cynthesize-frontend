import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IssueComponent, AddIssueComponent } from './issue/issue.component';
import { DetachedIssueComponent } from './issue/detached-issue/detached-issue.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentTextEditorModule } from '@covalent/text-editor';

@NgModule({
  declarations: [ViewComponent, IssueComponent, DetachedIssueComponent, AddIssueComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    CovalentMarkdownModule,
    CovalentTextEditorModule,
    FormsModule
  ]
})
export class ViewModule {}
