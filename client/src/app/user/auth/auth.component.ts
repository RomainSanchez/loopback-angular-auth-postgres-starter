import { Component } from '@angular/core';
import { LoopBackAuth, SDKToken } from '../../shared/sdk';
import { Router } from '@angular/router';
import { AppUserApi } from 'src/app/shared/sdk/services/custom/AppUser';
import { AppUser } from 'src/app/shared/sdk/models/AppUser';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  appUser: AppUser = new AppUser();
  error: string;

  constructor(
    private router: Router,
    private appUserApi: AppUserApi,
    private loopbackAuthService: LoopBackAuth,
    private permissionsService: NgxPermissionsService
  ) {
    if (router.url === '/logout') {
      this.appUserApi.logout().subscribe(() => {
        this.permissionsService.flushPermissions();
        localStorage.removeItem('permissions');
      });
    }
   }

  authenticate() {
    this.appUserApi.login(this.appUser).subscribe(
      (token: SDKToken) => {
        // Retrieve roles
        this.appUserApi.findById(token.user.id, { include: ['roles'] }).subscribe((appUser: AppUser) => {
          token.user = appUser;
          const roles = this.getRoleNames(token.user.roles);

          this.loopbackAuthService.setToken(token);
          this.permissionsService.loadPermissions(roles);

          // Store permissions for page reload
          localStorage.setItem('permissions', JSON.stringify(roles));

          this.router.navigate(['']);
        });
      },
      (error: any) => {
        this.error = error.message;
      }
    );
  }

  private getRoleNames(roles: any[]): string[] {
    const roleNames = [];

    roles.forEach(role => {
      roleNames.push(role.name);
    });

    return roleNames;
  }

}
