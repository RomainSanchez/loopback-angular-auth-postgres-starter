import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent },
  { path: 'users', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'user/profile/:appUserId', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'user/new', component: ProfileComponent, canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
