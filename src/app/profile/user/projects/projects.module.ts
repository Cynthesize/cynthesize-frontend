import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { LaunchedModule } from '@app/view/feed/launched/launched.module';
import { OngoingModule } from '@app/view/feed/ongoing/ongoing.module';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, ProjectsRoutingModule, LaunchedModule, OngoingModule, SharedModule, MaterialModule]
})
export class ProjectsModule {}
