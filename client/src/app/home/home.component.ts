import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Form, FormApi } from '../shared/sdk';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OpeningService } from '../service/opening.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  committee: string;
  capFormTypes: Form[];
  ctFormTypes: Form[];
  referralId: string;
  smallScreen: boolean;

  constructor(
    private router: Router,
    private formApi: FormApi,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    public openingService: OpeningService,
  ) {}

  ngOnInit() {
    this.observeScreenSize();

    this.getFormTypes();
  }

  setCommittee(committee: string) {
    this.committee = committee;

    this.stepper.next();
  }

  form(formId: string) {
    if (this.referralId) {
      this.router.navigate(['/referral/', this.referralId, formId]);

      return;
    }

    this.snackBar.open('Le formulaire de renseignement n\'a pas été rempli', null, {duration: 2000});

    this.stepper.reset();
  }

  informationSubmitted(referralId: string) {
    this.referralId = referralId;

    this.stepper.next();
  }

  private observeScreenSize() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  private getFormTypes() {
    this.formApi.find().subscribe((forms: Form[]) => {
      this.capFormTypes = forms.filter(form => form.committee === 'cap').sort(this.sortFormTypes);
      this.ctFormTypes = forms.filter(form => form.committee === 'ct').sort(this.sortFormTypes);
    });
  }

  private sortFormTypes(a: Form, b: Form) {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();

    return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
  }
}

