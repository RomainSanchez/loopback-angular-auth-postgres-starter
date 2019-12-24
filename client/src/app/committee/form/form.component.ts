import { Component, OnInit } from '@angular/core';
import { Committee } from 'src/app/shared/sdk/models/Committee';
import { CommitteeApi } from 'src/app/shared/sdk/services/custom/Committee';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  committee: Committee = new Committee();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private committeeApi: CommitteeApi,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const committeeId = this.route.snapshot.paramMap.get('committeeId');

    if (committeeId) {
      this.committeeApi.findById(committeeId).subscribe((committee: Committee) => {
        this.committee = committee;
      });
    }
  }

  submit(createAgain: boolean = false) {
    this.committeeApi.patchOrCreate(this.committee).subscribe((committee: Committee) => {
      this.snackBar.open('Séance enregistrée', '', {duration: 2000});

      if (createAgain) {
        this.committee = new Committee();

        return;
      }

      this.router.navigate(['/committees']);
    });
  }
}
