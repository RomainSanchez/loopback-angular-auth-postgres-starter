import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form } from 'src/app/shared/sdk';

@Component({
  selector: 'app-decision-dialog',
  templateUrl: './decision-dialog.component.html',
  styleUrls: ['./decision-dialog.component.sass']
})
export class DecisionDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Form) {}
}
