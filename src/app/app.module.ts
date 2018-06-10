import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Routes, CanActivate } from '@angular/router';
import { NglModule } from 'ng-lightning/ng-lightning';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UserComponent } from './views/user/user.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserProfileComponent } from './views/user/user-profile/user-profile.component';
import { NewsfeedComponent } from './views/newsfeed/newsfeed.component';

import { BoardAuthGuard } from './core/board-auth.guard';
import { AuthGuard } from './core/auth.guard';
import { AlertService } from './core/alert.service';
import { AuthService } from './core/auth.service';
import { BoardAuthService } from './core/board-auth.service';
import { TextualDetailsService } from './services/add-project/textual-details.service';
import { ProfileUpdateService } from './services/profile/profile-update.service';
import { AddProjectComponent } from './views/user/add-project/add-project.component';
import { BoardNotificationService } from './services/board-notification/board-notification.service';
import { AppRoutes } from './app.routes';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewsfeedService } from './services/newsfeed.service';
import { ProjectSummaryComponent } from './views/project/project-summary/project-summary.component';
import { ProjectDetailService } from './services/project/project-detail.service';
import { UpvoteComponent } from './views/project/project-summary/upvote/upvote.component';
import { DownvoteComponent } from './views/project/project-summary/downvote/downvote.component';
import { VotingService } from './services/project/voting.service';
import { BoardLoginComponent } from './views/board/board-login/board-login.component';
import { BoardDashboardComponent } from './views/board/board-dashboard/board-dashboard.component';
import { BoardReviewNotificationComponent } from './views/board/board-review-notification/board-review-notification.component';
import { ReviewComponent } from './views/project/project-summary/review/review.component';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CoreModule,
    AppRoutes,
    FormsModule,
    NglModule,
    InfiniteScrollModule,
    LocalStorageModule.withConfig({
      prefix: 'local-store',
      storageType: 'localStorage'
    }),
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    NewsfeedComponent,
    AddProjectComponent,
    ProjectSummaryComponent,
    UpvoteComponent,
    DownvoteComponent,
    UpvoteComponent,
    BoardLoginComponent,
    BoardDashboardComponent,
    ReviewComponent,
    BoardReviewNotificationComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    TextualDetailsService,
    NewsfeedService,
    ProjectDetailService,
    ProfileUpdateService,
    VotingService,
    AuthService,
    BoardAuthService,
    BoardAuthGuard,
    AlertService,
    BoardNotificationService
  ]
})
export class AppModule { }
