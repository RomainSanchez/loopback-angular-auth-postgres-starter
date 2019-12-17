import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'committees', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'committee/form/:committeeId', component: FormComponent, canActivate: [AuthGuardService] },
  { path: 'committee/new', component: FormComponent, canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteeRoutingModule { }
