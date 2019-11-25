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

  constructor(
    private route: ActivatedRoute,
    private formApi: FormApi,
    private referralApi: ReferralApi,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    const referralId = this.route.snapshot.paramMap.get('referralId');
    const formId = this.route.snapshot.paramMap.get('formId');

    this.referralApi.findById(referralId, {include: ['attachments', 'signedDocument']}).subscribe((referral: Referral) => {
      this.referral = referral;
      console.log(referral)
      this.referral.formId = parseInt(formId, null);

      this.formApi.findById(formId).subscribe((form: Form) => {
        this.referral.form = form;
      });
    });
  }

  formSubmit(data: any) {
    data.information = this.referral.data.information;
    this.referral.data = data;

    this.referralApi.replaceOrCreate(this.referral).subscribe((referral: Referral) => {
      this.snackbar.open('Formulaire enregistré', null, {duration: 2000});

      this.stepper.next();
    });
  }

  attachmentsDone() {
    this.stepper.next();
  }

  fileChange(referral: Referral) {
    this.referral = referral;
  }

}
