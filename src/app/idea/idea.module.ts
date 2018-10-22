import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaComponent } from './add-idea/idea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { ViewIdeaComponent } from './view-idea/view-idea.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    IdeaRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [IdeaComponent, ViewIdeaComponent]
})
export class IdeaModule { }
