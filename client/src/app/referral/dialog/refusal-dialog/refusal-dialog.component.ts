import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-refusal-dialog',
  templateUrl: './refusal-dialog.component.html',
  styleUrls: ['./refusal-dialog.component.sass']
})
export class RefusalDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  confirm() {
    this.data.confirmed = true;
  }
}
