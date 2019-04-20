import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { LaunchedModule } from '@app/view/feed/launched/launched.module';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProjectsRoutingModule, LaunchedModule, SharedModule, MaterialModule]
})
export class ProjectsModule {}
