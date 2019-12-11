import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule,
  MatRippleModule,
  MatSnackBarModule,
  MatGridListModule,
  MatListModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatRadioModule,
  MatChipsModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule,
  MatRippleModule,
  MatSnackBarModule,
  MatGridListModule,
  MatListModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatRadioModule,
  MatChipsModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
