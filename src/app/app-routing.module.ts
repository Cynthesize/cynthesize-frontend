import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { extract } from './core';

const routes: Routes = [
  Shell.childRoutes([{ path: 'idea', loadChildren: 'app/idea/idea.module#IdeaModule' }]),
  // Fallback when no prior route is matched
  { path: '404', component: NotFoundComponent, data: { title: extract('Page not found! :(') } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
