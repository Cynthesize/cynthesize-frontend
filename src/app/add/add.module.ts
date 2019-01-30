import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddProjectComponent } from './project/project.component';
import { AddIdeaComponent } from './add-idea/idea.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddProjectComponent, AddIdeaComponent],
  imports: [CommonModule, AddRoutingModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class AddModule {}
