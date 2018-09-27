import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';
import { AddIdeaComponent } from './components/idea/add-idea/add-idea.component';


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
    path: 'status',
    component: StatusComponent
  },
  {
    path: 'addidea',
    component: AddIdeaComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
