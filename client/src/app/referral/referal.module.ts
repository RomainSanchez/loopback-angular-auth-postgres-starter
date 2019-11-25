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
import { Cap01Component } from './form-types/cap01/cap01.component';
import { InformationComponent } from './form-types/information/information.component';
import { ListComponent } from './list/list.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SubmissionComponent } from './form-types/submission/submission.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FormComponent,
    Cap01Component,
    InformationComponent,
    ListComponent,
    FileUploadComponent,
    SubmissionComponent
  ],
  imports: [
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
  ]
})
export class ReferralModule { }
