import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ReferralApi, Referral } from 'src/app/shared/sdk';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass']
})
export class InformationComponent implements OnInit {
  @Output() afterSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('informationForm', { static: true }) form: NgForm;
  information: any = {};

  constructor(
    private referralApi: ReferralApi,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    const savedInformation = JSON.parse(localStorage.getItem('information'));

    if(savedInformation && Object.keys(this.information).length === 0) {
      this.information = savedInformation;
    }

    this.form.statusChanges.subscribe(() => {
      localStorage.setItem('information', JSON.stringify(this.information));
    });
  }

  submit() {
    const referral = new Referral();

    referral.data = {};
    referral.data.information = this.information;

    this.referralApi.create(referral).subscribe((theReferral: Referral) => {
      this.afterSubmit.emit(theReferral.id);

      localStorage.removeItem('information');

      this.snackbar.open('Renseignements enregistrés', null, {duration: 2000});
    });
  }
}
