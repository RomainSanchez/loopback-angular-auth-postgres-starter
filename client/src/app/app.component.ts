import { Component } from '@angular/core';
import { LoopBackConfig, LoopBackAuth, UserApi } from './shared/sdk';
import { TranslateService } from '@ngx-translate/core';

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
  ) {
    LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
    LoopBackConfig.setApiVersion('api');

    translateService.setDefaultLang('fr');
    translateService.use('fr');
    console.log(authService.getToken());
  }
}
