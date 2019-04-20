import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { SharedModule } from '@app/shared';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [CommonModule, ViewRoutingModule, SharedModule, ChartsModule],
  entryComponents: []
})
export class ViewModule {}
