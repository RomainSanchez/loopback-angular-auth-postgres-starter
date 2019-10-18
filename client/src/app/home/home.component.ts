import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { Form, FormApi } from '../shared/sdk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  committee: string;
  capFormTypes: Form[];
  ctFormTypes: Form[];

  constructor(
    private router: Router,
    private formApi: FormApi
  ) {}

  ngOnInit() {
    this.formApi.find().subscribe((forms: Form[]) => {
      this.capFormTypes = forms.filter(form => form.committee === 'cap').sort(this.sortFormTypes);
      this.ctFormTypes = forms.filter(form => form.committee === 'ct').sort(this.sortFormTypes);
    });
  }

  setCommittee(committee: string) {
    this.committee = committee;

    this.stepper.next();
  }

  form(formId: string) {
    this.router.navigate([`/referral/new/${formId}`]);
  }

  private sortFormTypes(a: Form, b: Form) {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();

    return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
  }
}

