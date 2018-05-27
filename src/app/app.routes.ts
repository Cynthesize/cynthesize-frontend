import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserComponent } from './views/user/user.component';
import { AuthGuard } from "./core/auth.guard";
import { UserProfileComponent } from './views/user/user-profile/user-profile.component';
import { AddProjectComponent } from './views/user/add-project/add-project.component';

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
    },
    {
      path: 'add-project',
      component: AddProjectComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);