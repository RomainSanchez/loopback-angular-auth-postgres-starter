import { Component } from '@angular/core';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Saisine d\'instances';

  constructor(
    private authService: LoopBackAuth,
    private translateService: TranslateService,
    private permissionsService: NgxPermissionsService
  ) {
    LoopBackConfig.setBaseURL('http://pow101825:3000');
    LoopBackConfig.setApiVersion('api');

    translateService.setDefaultLang('fr');
    translateService.use('fr');

    const permissions = JSON.parse(localStorage.getItem('permissions'));

    if (permissions && this.authService.getAccessTokenId()) {
      this.permissionsService.loadPermissions(permissions);
    }
  }
}
