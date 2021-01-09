import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthguardService } from '../authguard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthguardService] },
  { path: 'admin', loadChildren: () => import('../app-routing.module').then(m => m.AppRoutingModule) },
  { path: 'error-pages', loadChildren: () => import('../error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
  ],
    exports: [RouterModule]

})
export class UserPagesModule { }
