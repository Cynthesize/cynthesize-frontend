import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngoingRoutingModule } from './ongoing-routing.module';
import { OngoingProjectsComponent, ProjectDialogEntryComponent } from './ongoing-projects/ongoing-projects.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { MatBottomSheetModule } from '@angular/material';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};

@NgModule({
  declarations: [OngoingProjectsComponent, ProjectDialogEntryComponent],
  imports: [
    CommonModule,
    OngoingRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  entryComponents: [ProjectDialogEntryComponent],
  exports: [ProjectDialogEntryComponent]
})
export class OngoingModule {}
