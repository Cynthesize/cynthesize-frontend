import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaunchedRoutingModule } from './launched-routing.module';
import {
  LaunchedProductsComponent,
  ProjectDialogEntryComponent
} from './launched-products/launched-products.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [LaunchedProductsComponent, ProjectDialogEntryComponent],
  imports: [CommonModule, LaunchedRoutingModule, SharedModule, MaterialModule],
  exports: [LaunchedProductsComponent]
})
export class LaunchedModule {}
