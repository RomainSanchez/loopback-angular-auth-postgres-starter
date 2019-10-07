import { Component } from '@angular/core';
import { User, UserApi, LoopBackAuth, SDKToken } from '../shared/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  user: User = new User();
  error: string;

  constructor(
    private router: Router,
    private userApi: UserApi,
    private authService: LoopBackAuth
  ) { }

  authenticate() {
    this.userApi.login(this.user).subscribe(
      (token: SDKToken) => {
        this.authService.setToken(token);
        this.router.navigate(['home']);
      },
      (error: any) => {
        console.log(error);
        this.error = error.message;
      }
    );
  }

}
