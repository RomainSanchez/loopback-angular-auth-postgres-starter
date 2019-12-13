import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.sass']
})
export class ValidationDialogComponent {
  @Output() hasConfirmed = new EventEmitter<boolean>();

  constructor() { }

}
