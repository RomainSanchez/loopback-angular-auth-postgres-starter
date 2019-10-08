import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent },
  { path: 'user/list', component: ListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
