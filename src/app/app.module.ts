import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerDialogComponent } from './customers/edit-customer-dialog/edit-customer-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    EditCustomerDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  entryComponents: [
    EditCustomerDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
