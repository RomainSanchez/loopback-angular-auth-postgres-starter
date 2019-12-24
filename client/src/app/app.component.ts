import { Component, ViewChild } from '@angular/core';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { DateAdapter } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  smallScreen = false;
  adminLinks: any[] = [
    {name: 'Utilisateurs', url:'/users'},
    {name: 'Séances', url:'/committees'},
    {name: 'Saisines', url:'/referrals'}
  ];

  constructor(
    private authService: LoopBackAuth,
    private translateService: TranslateService,
    private permissionsService: NgxPermissionsService,
    private dateAdapter: DateAdapter<any>
  ) {
    LoopBackConfig.setBaseURL('http://pow101825:3000');
    LoopBackConfig.setApiVersion('api');

    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');

    this.dateAdapter.setLocale('fr');

    const permissions = JSON.parse(localStorage.getItem('permissions'));

    if (permissions && this.authService.getAccessTokenId()) {
      this.permissionsService.loadPermissions(permissions);
    }
  }
}
