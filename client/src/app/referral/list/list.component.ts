import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Referral, ReferralApi } from 'src/app/shared/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'committee',
    'form',
    'community',
    'created',
    'status'
  ];
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  tableDataSource: MatTableDataSource<Referral>;
  isLoading = false;

  constructor(
    private router: Router,
    private referralApi: ReferralApi
  ) {
    this.tableDataSource = new MatTableDataSource<Referral>();
  }

  ngOnInit() {
    this.getReferrals();
    this.tableDataSource.filterPredicate = this.filter;
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  getReferrals() {
    this.isLoading = true;

    return this.referralApi.find({
      where: {
        formId: {
          neq: null
        }
      },
      include: ['form', 'attachments', 'createdBy', 'updatedBy', 'validatedBy'],
    }).subscribe((referrals: Referral[]) => {
      this.tableDataSource.data = referrals;
      this.isLoading = false;
    });
  }

  doFilter = (value: string) => {
    this.tableDataSource.filter = value.trim().toLocaleLowerCase();
  }

  rowClicked(referral: Referral) {
    this.router.navigate(['/referral/', referral.id, referral.form.id]);
  }

  private filter(referral: Referral, filters: string) {
    const matchFilter = [];
    const filterArray = filters.split('+');

    const fields = Object.values(referral).filter(Boolean);

    filterArray.forEach(filter => {
      const customFilter = [];

      fields.forEach(field => {
        if (typeof field === 'string') {
          customFilter.push(field.toLocaleLowerCase().includes(filter));
        }
      });
      matchFilter.push(customFilter.some(Boolean));
    });

    return matchFilter.every(Boolean);
  }
}
