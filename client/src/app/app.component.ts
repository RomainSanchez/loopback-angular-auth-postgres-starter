import { Component } from '@angular/core';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Saisine d\'instances';

  constructor(private authService: LoopBackAuth) {
    LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
    LoopBackConfig.setApiVersion('api');
  }
}
