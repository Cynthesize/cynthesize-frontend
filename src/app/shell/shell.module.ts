import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { GraphqlModule } from './graphql/graphql.module';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};
import { RequestsComponent } from './header/requests/requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    GraphqlModule,
    CloudinaryModule.forRoot(cloudinary, config),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule
  ],
  declarations: [HeaderComponent, ShellComponent, RequestsComponent],
  entryComponents: [RequestsComponent]
})
export class ShellModule {}
