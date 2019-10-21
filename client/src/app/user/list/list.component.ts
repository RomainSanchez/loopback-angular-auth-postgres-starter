import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Community } from 'src/app/shared/sdk/models/Community';
import { Router } from '@angular/router';
import { CommunityApi } from 'src/app/shared/sdk/services/custom/Community';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'username',
    'name',
    'email',
    'roles'
  ];
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  tableDataSource: MatTableDataSource<Community>;
  selectedcommunity: Community;
  isLoading = false;

  constructor(
    private router: Router,
    private communityApi: CommunityApi
  ) {
    this.tableDataSource = new MatTableDataSource<Community>();
  }

  ngOnInit() {
    this.getCommunities();
    this.tableDataSource.filterPredicate = this.filter;
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  getCommunities() {
    this.isLoading = true;

    return this.communityApi.find({include: ['roles']}).subscribe((communities: Community[]) => {
      this.tableDataSource.data = communities;

      this.isLoading = false;
    });
  }

  doFilter = (value: string) => {
    this.tableDataSource.filter = value.trim().toLocaleLowerCase();
  }

  rowClicked(communityId: number) {
    this.router.navigate(['/user/profile', communityId]);
  }

  private filter(community: Community, filters: string) {
    const matchFilter = [];
    const filterArray = filters.split('+');

    const fields = Object.values(community).filter(Boolean);

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
