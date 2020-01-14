import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InformationComponent } from './form-types/information/information.component';
import { ListComponent } from './list/list.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Ct01Component } from './form-types/ct01/ct01.component';
import { StatusComponent } from './status/status.component';
import { ValidationDialogComponent } from './dialog/validation-dialog/validation-dialog.component';
import { RefusalDialogComponent } from './dialog/refusal-dialog/refusal-dialog.component';
import { DecisionDialogComponent } from './dialog/decision-dialog/decision-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Cap01Component } from './form-types/cap01/cap01.component';
import { Cap02Component } from './form-types/cap02/cap02.component';
import { Cap03Component } from './form-types/cap03/cap03.component';
import { Cap04Component } from './form-types/cap04/cap04.component';
import { Cap05Component } from './form-types/cap05/cap05.component';
import { Cap06Component } from './form-types/cap06/cap06.component';
import { Cap07Component } from './form-types/cap07/cap07.component';
import { Cap08Component } from './form-types/cap08/cap08.component';
import { Cap09Component } from './form-types/cap09/cap09.component';
import { Cap10Component } from './form-types/cap10/cap10.component';
import { Cap11Component } from './form-types/cap11/cap11.component';
import { Cap12Component } from './form-types/cap12/cap12.component';
import { Cap13Component } from './form-types/cap13/cap13.component';
import { Cap14Component } from './form-types/cap14/cap14.component';
import { Cap15Component } from './form-types/cap15/cap15.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FormComponent,
    InformationComponent,
    ListComponent,
    FileUploadComponent,
    StatusComponent,
    ValidationDialogComponent,
    RefusalDialogComponent,
    DecisionDialogComponent,
    Cap01Component,
    Cap02Component,
    Cap03Component,
    Cap04Component,
    Cap05Component,
    Cap06Component,
    Cap07Component,
    Cap08Component,
    Cap09Component,
    Cap10Component,
    Cap11Component,
    Cap12Component,
    Cap13Component,
    Cap14Component,
    Cap15Component,
    Ct01Component,
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxPermissionsModule.forChild(),
    NgxDropzoneModule
  ],
  exports: [
    InformationComponent
  ],
  entryComponents: [
    ValidationDialogComponent,
    RefusalDialogComponent,
    DecisionDialogComponent
  ]
})
export class ReferralModule { }
