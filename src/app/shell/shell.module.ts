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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config1 = {
  apiKey: 'AIzaSyD2oozKEveW6wK7y17LW2UHnkvF5_Efa14',
  authDomain: 'cynthesize-dev.firebaseapp.com',
  databaseURL: 'https://cynthesize-dev.firebaseio.com',
  projectId: 'cynthesize-dev',
  storageBucket: 'cynthesize-dev.appspot.com',
  messagingSenderId: '733243062921'
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    GraphqlModule,
    CloudinaryModule.forRoot(cloudinary, config),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [HeaderComponent, ShellComponent]
})
export class ShellModule {}
