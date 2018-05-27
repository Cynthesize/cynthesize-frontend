import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Routes, CanActivate } from "@angular/router";


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UserComponent } from './views/user/user.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserProfileComponent } from './views/user/user-profile/user-profile.component';
import { NewsfeedComponent } from './views/newsfeed/newsfeed.component';

import { AuthGuard } from './core/auth.guard';
import { TextualDetailsService } from './services/add-project/textual-details.service';
import { AddProjectComponent } from './views/user/add-project/add-project.component';
import { AppRoutes } from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreModule,
    AppRoutes,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'local-store',
      storageType: 'localStorage'
    }),
  ],
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    NewsfeedComponent,
    AddProjectComponent
  ],
  bootstrap: [ AppComponent ],
  providers : [AuthGuard, TextualDetailsService]
})
export class AppModule {}
