import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);