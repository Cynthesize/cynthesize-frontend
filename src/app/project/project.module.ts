import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AddComponent } from './add/add.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { IssueComponent } from './issue/issue.component';

@NgModule({
  declarations: [AddComponent, ViewComponent, IssueComponent],
  imports: [CommonModule, ProjectRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule]
})
export class ProjectModule {}
