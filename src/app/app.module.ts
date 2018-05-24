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

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreModule,
    RouterModule.forRoot([
      {
        path: '',
        component: UserComponent
      }
    ])
  ],
  declarations: [ AppComponent, UserComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
