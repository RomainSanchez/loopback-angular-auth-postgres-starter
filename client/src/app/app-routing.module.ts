import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { UserRoutingModule } from './user/user-routing.module';
import { ReferralRoutingModule } from './referral/referral-routing.module';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    UserRoutingModule,
    ReferralRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
