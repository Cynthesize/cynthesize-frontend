import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserComponent } from './views/user/user.component';
import { AuthGuard } from "./core/auth.guard";
import { UserProfileComponent } from './views/user/user-profile/user-profile.component';

const appRoutes: Routes = [
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
];

export const AppRoutes = RouterModule.forRoot(appRoutes);