import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'commits',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/commits/commits.module').then(m => m.CommitsModule)
  },
  {
    path: 'resale',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/resale/resale.module').then(m => m.ResaleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
