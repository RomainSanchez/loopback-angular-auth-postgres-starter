import { Component } from '@angular/core';
import { LoopBackAuth, SDKToken } from '../../shared/sdk';
import { Router } from '@angular/router';
import { CommunityApi } from 'src/app/shared/sdk/services/custom/Community';
import { Community } from 'src/app/shared/sdk/models/Community';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  community: Community = new Community();
  error: string;

  constructor(
    private router: Router,
    private communityApi: CommunityApi,
    private loopbackAuthService: LoopBackAuth,
    private permissionsService: NgxPermissionsService
  ) {
    if (router.url === '/logout') {
      this.communityApi.logout().subscribe(() => {
        this.permissionsService.flushPermissions();
        localStorage.removeItem('permissions');
      });
    }
   }

  authenticate() {
    this.communityApi.login(this.community).subscribe(
      (token: SDKToken) => {
        console.log(token);
        // Retrieve roles
        this.communityApi.findById(token.user.id, { include: ['roles'] }).subscribe((community: Community) => {
          token.user = community;
          const roles = this.getRoleNames(token.user.roles);

          this.loopbackAuthService.setToken(token);
          this.permissionsService.loadPermissions(roles);

          // Store permissions for page reload
          localStorage.setItem('permissions', JSON.stringify(roles));

          this.router.navigate(['home']);
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
