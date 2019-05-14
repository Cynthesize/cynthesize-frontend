import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-project-routing.module';
import { ViewProjectComponent } from './view-project.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IssueComponent, AddIssueComponent } from './issue/issue.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { ReviewComponent } from './review/review.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectTimelineComponent } from './project-timeline/project-timeline.component';
import { ChartsModule } from 'ng2-charts';
import { ProjectProgressComponent } from './project-progress/project-progress.component';

@NgModule({
  declarations: [
    ViewProjectComponent,
    IssueComponent,
    AddIssueComponent,
    ReviewComponent,
    ProjectHomeComponent,
    ProjectTimelineComponent,
    ProjectProgressComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    CovalentMarkdownModule,
    ChartsModule,
    CovalentTextEditorModule,
    FormsModule
  ],
  entryComponents: [AddIssueComponent, ReviewComponent, ProjectHomeComponent, ProjectTimelineComponent]
})
export class ViewProjectModule {}
