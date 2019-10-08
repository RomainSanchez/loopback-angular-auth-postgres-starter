import { Component } from '@angular/core';
import { LoopBackAuth, SDKToken } from '../../shared/sdk';
import { Router } from '@angular/router';
import { CommunityApi } from 'src/app/shared/sdk/services/custom/Community';
import { Community } from 'src/app/shared/sdk/models/Community';

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
    private loopbackAuthService: LoopBackAuth
  ) {
    if (router.url === '/logout') {
      this.communityApi.logout().subscribe();
    }
   }

  authenticate() {
    this.communityApi.login(this.community).subscribe(
      (token: SDKToken) => {
        // Retrieve roles
        this.communityApi.findOne({
          where: {
            id: token.user.id
          },
          include: ['roles']
        }).subscribe((community: Community) => {
          token.user = community;
          this.loopbackAuthService.setToken(token);

          this.router.navigate(['home']);
        });
      },
      (error: any) => {
        this.error = error.message;
      }
    );
  }

}
