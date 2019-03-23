import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeasRoutingModule } from './ideas-routing.module';
import { IdeasComponent } from './ideas.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [IdeasComponent],
  imports: [CommonModule, IdeasRoutingModule, SharedModule, MaterialModule]
})
export class IdeasModule {}
