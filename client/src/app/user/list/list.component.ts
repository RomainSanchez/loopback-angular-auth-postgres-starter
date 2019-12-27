import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/shared/sdk/models/AppUser';
import { Router } from '@angular/router';
import { AppUserApi } from 'src/app/shared/sdk/services/custom/AppUser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns = [
    'username',
    'name',
    'email',
    'roles'
  ];
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  tableDataSource: MatTableDataSource<AppUser>;
  isLoading = false;

  constructor(
    private router: Router,
    private appUserApi: AppUserApi
  ) {
    this.tableDataSource = new MatTableDataSource<AppUser>();
  }

  ngOnInit() {
    this.getAppUsers();
  }

  ngAfterViewInit() {
    this.tableDataSource.filterPredicate = this.filter;
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  getAppUsers() {
    this.isLoading = true;

    return this.appUserApi.find({include: ['roles']}).subscribe((appUsers: AppUser[]) => {
      this.tableDataSource.data = appUsers;

      this.isLoading = false;
    });
  }

  doFilter = (value: string) => {
    this.tableDataSource.filter = value.trim().toLocaleLowerCase();
  }

  rowClicked(appUserId: number) {
    this.router.navigate(['/user/profile', appUserId]);
  }

  private filter(appUser: AppUser, filters: string) {
    const matchFilter = [];
    const filterArray = filters.split('+');

    const fields = Object.values(appUser).filter(Boolean);

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
