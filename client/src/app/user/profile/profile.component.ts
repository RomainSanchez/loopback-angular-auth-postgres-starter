import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppUser, RoleApi, Role, AppUserApi, LoopBackAuth } from 'src/app/shared/sdk';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  roles: Role[];
  userRoles: Role[] = [];
  appUser: AppUser = new AppUser();

  constructor(
    private route: ActivatedRoute,
    private roleApi: RoleApi,
    private appUserApi: AppUserApi,
    private snackBar: MatSnackBar,
    private loopbackAuthService: LoopBackAuth,
  ) { }

  ngOnInit() {
    this.roleApi.find().subscribe((roles: Role[]) => {
      this.roles = roles;

      this.appUser.roles = [];

      const appUserId = this.route.snapshot.paramMap.get('appUserId');

      if (appUserId) {
        this.appUserApi.findById(appUserId, {include: ['roles']}).subscribe((appUser: AppUser) => {
          this.appUser = appUser;
          this.userRoles = Object.assign([], appUser.roles);

          if (!this.currentUserIs('admin')) {
            this.roles = this.roles.filter(role => role.name !== 'admin');

            if (this.currentUserIs('secretary')) {
              this.roles = this.roles.filter(role => role.name !== 'community');
            }
          }
        });
      }
    });
  }

  onSubmit() {
    this.appUser.realm = 'backend';

    this.appUserApi.patchOrCreate(this.appUser).subscribe((appUser: AppUser) => {
      this.snackBar.open('Utilisateur enregistré', '', {duration: 2000});

      if (!this.appUser.id) {
        const roles = this.appUser.roles;
        this.appUser = appUser;
        this.appUser.roles = roles;
      }

      this.appUser.roles.forEach((role: Role) => {
        if (!this.hadRole(role.name)) {
          this.roleApi.createPrincipals(role.id, {
            principalType: 'USER',
            principalId: this.appUser.id,
            roleId: role.id
          }).subscribe(() => {
            this.userRoles.push(role);
          });
        }
      });
    });
  }

  currentUserIs(roleName: string): boolean {
    const loggedInUserRoles = this.loopbackAuthService.getToken().user.roles;

    return loggedInUserRoles.filter(role => role.name === roleName).length > 0;
  }

  hasRole(roleName: string): boolean {
    return this.appUser.roles.filter(role => role.name === roleName).length > 0;
  }

  hadRole(roleName: string): boolean {
    return this.userRoles.filter(role => role.name === roleName).length > 0;
  }

  toggleRole(role: Role) {
    const hasRole = this.hasRole(role.name);

    if (hasRole) {
      this.appUserApi.removeRole(this.appUser.id, this.appUser.id, role.id).subscribe(() => {
        this.appUser.roles = this.appUser.roles.filter(theRole => theRole.name !== role.name);
        this.userRoles = this.userRoles.filter(theRole => theRole.name !== role.name);
      });

      return;
    }

    this.appUser.roles.push(role);
  }
}
