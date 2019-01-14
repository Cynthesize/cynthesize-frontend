import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'cynthesize' })
  ],
  declarations: [DetailsComponent]
})
export class UserModule {}
