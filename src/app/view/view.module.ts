import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { IdeaComponent } from './idea/idea.component';

@NgModule({
  declarations: [IdeaComponent],
  imports: [CommonModule, ViewRoutingModule],
  entryComponents: [IdeaComponent]
})
export class ViewModule {}
