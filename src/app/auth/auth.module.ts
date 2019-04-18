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
import { firebaseapp } from '../../environments/environment';

const config = {
  apiKey: firebaseapp.apiKey,
  authDomain: firebaseapp.authDomain,
  databaseURL: firebaseapp.databaseURL,
  projectId: firebaseapp.projectId,
  storageBucket: firebaseapp.storageBucket,
  messagingSenderId: firebaseapp.messagingSenderId
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
