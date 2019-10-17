import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Community, RoleApi, Role, CommunityApi } from 'src/app/shared/sdk';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  roles: Role[];
  userRoles: Role[] = [];
  community: Community = new Community();

  constructor(
    private route: ActivatedRoute,
    private roleApi: RoleApi,
    private communityApi: CommunityApi,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.roleApi.find().subscribe((roles: Role[]) => {
      this.roles = roles;
    });

    this.community.roles = [];

    const communityId = this.route.snapshot.paramMap.get('communityId');

    if (communityId) {
      this.communityApi.findById(communityId, {include: ['roles']}).subscribe((community: Community) => {
        this.community = community;
        this.userRoles = Object.assign([], community.roles);
      });
    }
  }

  onSubmit() {
    this.community.realm = 'backend';

    this.communityApi.patchOrCreate(this.community).subscribe((community: Community) => {
      this.snackBar.open('Utilisateur enregistré', '', {duration: 2000});

      if (!this.community.id) {
        const roles = this.community.roles;
        this.community = community;
        this.community.roles = roles;
      }

      this.community.roles.forEach((role: Role) => {
        if (!this.hadRole(role.name)) {
          this.roleApi.createPrincipals(role.id, {
            principalType: 'USER',
            principalId: this.community.id,
            roleId: role.id
          }).subscribe(() => {
            this.userRoles.push(role);
          });
        }
      });
    });
  }

  hasRole(roleName: string): boolean {
    return this.community.roles.filter(role => role.name === roleName).length > 0;
  }

  hadRole(roleName: string): boolean {
    return this.userRoles.filter(role => role.name === roleName).length > 0;
  }

  toggleRole(role: Role) {
    const hasRole = this.hasRole(role.name);

    if (hasRole) {
      this.communityApi.removeRole(this.community.id, role.id).subscribe(() => {
        this.community.roles = this.community.roles.filter(theRole => theRole.name !== role.name);
        this.userRoles = this.userRoles.filter(theRole => theRole.name !== role.name);
      });

      return;
    }

    this.community.roles.push(role);
  }
}
