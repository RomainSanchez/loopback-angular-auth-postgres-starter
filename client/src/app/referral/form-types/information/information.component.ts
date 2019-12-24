import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ReferralApi, Referral } from 'src/app/shared/sdk';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass']
})
export class InformationComponent implements OnInit {
  @Output() afterSubmit: EventEmitter<any> = new EventEmitter<any>();
  information: any = {};

  constructor(
    private referralApi: ReferralApi,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  submit() {
    const referral = new Referral();
    referral.data = {};
    referral.data.information = this.information;

    this.referralApi.create(referral).subscribe((theReferral: Referral) => {
      this.afterSubmit.emit(theReferral.id);

      this.snackbar.open('Renseignements enregistrés', null, {duration: 2000});
    });
  }

}
