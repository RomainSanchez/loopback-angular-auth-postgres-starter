import { Component, Input } from '@angular/core';

@Component({
  selector: 'referral-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.sass']
})
export class StatusComponent {
  @Input() status: string;

  constructor() {}
}
