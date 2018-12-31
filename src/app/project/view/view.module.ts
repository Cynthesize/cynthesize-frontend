import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewComponent],
  imports: [CommonModule, ViewRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule]
})
export class ViewModule {}
