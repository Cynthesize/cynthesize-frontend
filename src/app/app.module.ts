/* Modules */
import { HttpModule } from '@angular/http';
import { MyMaterialModule } from './material';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AddIdeaComponent } from './components/idea/add-idea/add-idea.component';
import { IdeaPageComponent } from './components/idea/idea-page/idea-page.component';
import { IdeaCardComponent } from './components/idea/idea-card/idea-card.component';
import { IdeaModalComponent } from './components/idea/idea-modal/idea-modal.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';

/* Services */
import { IdeaService } from './services/idea.service';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'idea/add-idea',
    component: AddIdeaComponent
  },
  {
    path: 'idea/ideas',
    component: IdeaPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AddIdeaComponent,
    IdeaPageComponent,
    IdeaCardComponent,
    IdeaModalComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    AuthService,
    IdeaService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
