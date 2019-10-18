import { Component, OnInit } from '@angular/core';
import { Form, FormApi, Referral, ReferralApi } from 'src/app/shared/sdk';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  formType: Form;
  referral: Referral = new Referral();

  constructor(
    private route: ActivatedRoute,
    private formApi: FormApi,
    private referralApi: ReferralApi
  ) { }

  ngOnInit() {
    const formId = this.route.snapshot.paramMap.get('formId');

    this.formApi.findById(formId).subscribe((form: Form) => {
      this.formType = form;
    });
  }

  formSubmit(data: any) {
    console.log(data);
  }

}
