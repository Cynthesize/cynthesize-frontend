import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
  declarations: [],
  providers: []
})
export class ProfileModule {}
