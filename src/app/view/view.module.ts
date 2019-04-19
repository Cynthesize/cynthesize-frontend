import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { IdeaComponent } from './idea/idea.component';
import { SharedModule } from '@app/shared';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IdeaComponent],
  imports: [CommonModule, ViewRoutingModule, SharedModule, ChartsModule],
  entryComponents: [IdeaComponent]
})
export class ViewModule {}
