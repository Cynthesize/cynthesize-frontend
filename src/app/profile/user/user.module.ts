import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  declarations: [DetailsComponent],
  entryComponents: [IdeaCardComponent]
})
export class UserModule {}
