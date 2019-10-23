import { Component, OnInit } from '@angular/core';
import { Form, FormApi, Referral, ReferralApi } from 'src/app/shared/sdk';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  formType: Form;
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

    this.referralApi.findById(referralId).subscribe((referral: Referral) => {
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

    this.referralApi.replaceOrCreate(this.referral).subscribe((referral: Referral) => {
      this.snackbar.open('Saisine enregistrée', null, {duration: 2000});
    });
  }

}
