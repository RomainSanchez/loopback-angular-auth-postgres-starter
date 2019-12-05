import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormApi, Referral, ReferralApi } from 'src/app/shared/sdk';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatStepper } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  referral: Referral;
  summaryDownloadUrl = '';

  constructor(
    private route: ActivatedRoute,
    private formApi: FormApi,
    private referralApi: ReferralApi,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    const referralId = this.route.snapshot.paramMap.get('referralId');
    const formId = this.route.snapshot.paramMap.get('formId');

    this.referralApi.findById(referralId, {
      include: ['attachments', 'signedSummary', 'validatedBy']
    }).subscribe((referral: Referral) => {
      this.referral = referral;

      this.referral.formId = parseInt(formId, null);

      this.formApi.findById(formId).subscribe((form: Form) => {
        this.referral.form = form;
      });
    });
  }

  formSubmit(data: any) {
    data.information = this.referral.data.information;
    this.referral.data = data;
    this.referral.status = 'form';

    this.referralApi.replaceOrCreate(this.referral).subscribe((referral: Referral) => {
      this.snackbar.open('Formulaire enregistré', null, {duration: 2000});

      this.stepper.next();
    });
  }

  fileChange(referral: Referral) {
    this.referral = referral;
  }

  downloadSummary() {
    this.referralApi.generateSummary(this.referral.id).subscribe(async res => {
      const link = document.createElement('a');

      link.href = `data:application/pdf;base64,${res.$data}`;
      link.download = `saisine.pdf`;

      document.body.appendChild(link);
      link.click();

      this.stepper.next();

      this.referral.status = 'downloaded';

      this.referralApi.replaceOrCreate(this.referral).subscribe();
    });
  }

  signed() {
    const attachments = this.referral.attachments;

    this.referral.status = 'signed';
    delete this.referral.attachments;

    this.referralApi.replaceOrCreate(this.referral).subscribe((referral) => {
      this.referral.attachments = attachments;

      this.snackbar.open('Saisine validée', null, {duration: 2000});
    });
  }

  validate() {
    this.referral.status = 'valid';
    delete this.referral.attachments;

    this.referralApi.replaceOrCreate(this.referral).subscribe(() => {
      this.snackbar.open('Saisine validée', null, {duration: 2000});
    });
  }
}
