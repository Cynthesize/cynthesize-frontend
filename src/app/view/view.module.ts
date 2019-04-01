import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { IdeaComponent } from './idea/idea.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [IdeaComponent],
  imports: [CommonModule, ViewRoutingModule, SharedModule],
  entryComponents: [IdeaComponent]
})
export class ViewModule {}
