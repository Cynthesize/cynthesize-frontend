import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule],
  declarations: [DetailsComponent]
})
export class UserModule {}
