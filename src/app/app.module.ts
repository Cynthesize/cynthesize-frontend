import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { Routes, CanActivate } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { LocalStorageModule } from 'angular-2-local-storage';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'local-store',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: UserComponent
      },
      
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: UserProfileComponent
      }
    ])
  ],
  declarations: [ AppComponent, UserComponent, LoginComponent,DashboardComponent, UserProfileComponent, NewsfeedComponent],
  bootstrap: [ AppComponent ],
  providers : [AuthGuard]
})
export class AppModule {}
