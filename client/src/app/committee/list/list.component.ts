import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Committee } from 'src/app/shared/sdk/models/Committee';
import { CommitteeApi } from 'src/app/shared/sdk/services/custom/Committee';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns = [
    'type',
    'session',
    'limit',
    'location',
    'referrals',
    'delete'
  ];
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  tableDataSource: MatTableDataSource<Committee>;
  isLoading = false;

  constructor(
    private router: Router,
    private committeeApi: CommitteeApi,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.tableDataSource = new MatTableDataSource<Committee>();
  }

  ngOnInit() {
    this.getCommittees();
  }

  ngAfterViewInit() {
    this.tableDataSource.filterPredicate = this.filter;
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  getCommittees() {
    this.isLoading = true;

    return this.committeeApi.find({include: ['referrals']}).subscribe((committees: Committee[]) => {
      this.tableDataSource.data = committees;

      this.isLoading = false;
    });
  }

  doFilter = (value: string) => {
    this.tableDataSource.filter = value.trim().toLocaleLowerCase();
  }

  rowClicked(committeeId: number) {
    this.router.navigate(['/committee/form', committeeId]);
  }

  openConfirmationDialog(committeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous vraiment supprimer cette séance ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.committeeApi.deleteById(committeeId).subscribe(() => {
          this.tableDataSource.data = this.tableDataSource.data.filter(committee => committee.id !== committeeId)
          this.snackBar.open('Séance supprimée', '', {duration: 2000});
        });
      }
    });
  }

  showReferrals(committeeId: number) {
    this.router.navigate(['/referrals/committee', committeeId]);
  }

  private filter(committee: Committee, filters: string) {
    const matchFilter = [];
    const filterArray = filters.split('+');
    const fields = Object.values(committee).filter(Boolean);

    filterArray.forEach(filter => {
      const customFilter = [];

      fields.forEach(field => {
        if (typeof field === 'string') {
          customFilter.push(this.asDate(field).toLocaleLowerCase().includes(filter));
        }
      });
      matchFilter.push(customFilter.some(Boolean));
    });

    return matchFilter.every(Boolean);
  }

  private asDate(field: string): string {
    const date = moment(field);

    if (date.isValid()) {
      field = date.format('DD/MM/YY');
    }

    return field;
  }
}
