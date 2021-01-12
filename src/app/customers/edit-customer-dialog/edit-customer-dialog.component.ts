import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog/';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerDataSource, CustomerListItem } from '../customer.datasource';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent implements OnInit {
  form: FormGroup;
  customer: CustomerListItem[];
  newCustomer: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Intitlaize the form
    this.form = this.formBuilder.group({
      name: this.data.name,
      address: this.data.address
    })
    this.newCustomer = this.data.newCustomer

  }

  onSubmitForm() {
    // Update Customer
    this.dialogRef.close(this.form.value);
  }

}
