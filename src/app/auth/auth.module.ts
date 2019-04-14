import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { LoginRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config = {
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
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    LoginRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule {}
