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
  MatSelectModule
} from '@angular/material';

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
  MatSelectModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
