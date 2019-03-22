import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaunchedRoutingModule } from './launched-routing.module';
import { LaunchedProductsComponent } from './launched-products/launched-products.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [LaunchedProductsComponent],
  imports: [CommonModule, LaunchedRoutingModule, SharedModule, MaterialModule]
})
export class LaunchedModule {}
