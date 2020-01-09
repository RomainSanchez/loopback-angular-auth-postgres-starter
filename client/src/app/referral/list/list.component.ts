import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Referral, ReferralApi, LoopBackAuth } from 'src/app/shared/sdk';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

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
    private route: ActivatedRoute,
    private authService: LoopBackAuth,
    private referralApi: ReferralApi
  ) {
    this.tableDataSource = new MatTableDataSource<Referral>();
  }

  ngOnInit() {
    this.getReferrals();
  }

  ngAfterViewInit() {
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.filterPredicate = this.filter;
    this.tableDataSource.paginator = this.paginator;
  }

  getReferrals() {
    this.isLoading = true;

    return this.referralApi.find({
      where: this.getWhereClauses(),
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

  private getWhereClauses(): any {
    const committeeId = this.route.snapshot.paramMap.get('committeeId');

    if (committeeId) {
      return { committeeId };
    }

    if (this.route.snapshot.url.join().indexOf('user') > -1) {
      return {
        formId: {
          neq: null
        },
        createdById: this.authService.getCurrentUserId()
      };
    }

    return {
      formId: {
        neq: null
      }
    };
  }
}
