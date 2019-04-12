import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { SharedModule } from '@app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule, EditRoutingModule, SharedModule, FormsModule, MaterialModule, ReactiveFormsModule]
})
export class EditModule {}
