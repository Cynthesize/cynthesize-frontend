import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';


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
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
