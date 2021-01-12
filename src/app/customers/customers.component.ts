import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog/';
import { EditCustomerDialogComponent } from '../customers/edit-customer-dialog/edit-customer-dialog.component';
import { CustomerDataSource, CustomerListItem } from './customer.datasource';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: CustomerDataSource;
  customer: CustomerListItem[];
  displayedColumns: string[]

  constructor(
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'address', 'actions'];
    this.dataSource = new CustomerDataSource(this.paginator, this.sort,
    );
  }

  addCustomer() {

    const dialogRef = this.dialog.open(EditCustomerDialogComponent, <MatDialogConfig>{
      data: { name: null, adress: null, newCustomer: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.table.renderRows();
      }
    });
  }


  editCustomer(customer: CustomerListItem, index: number) {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, <MatDialogConfig>{
      data: customer,
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.dataSource.data[index] = result
          this.table.renderRows();
        }

      });
  }

  deleteCustomer(customer: CustomerListItem) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.dataSource.data = this.dataSource.data.filter(person => person.name != customer.name);
    }
  }

}


