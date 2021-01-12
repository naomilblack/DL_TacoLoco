import { map } from 'rxjs/operators';
import { Observable, merge, Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface CustomerListItem {
  name: string;
  address: string;
}

// TODO: replace this with real data from server
const EXAMPLE_DATA: CustomerListItem[] = [
  { name: 'Michael Jordan', address: '1111 Grail St. Concord MI 98076' },
  { name: 'Jeremy Scott', address: '7690 Wing Drive. Adidas, MI' },
  { name: 'Hiroki Nakamura', address: '980 Air Force Rd. Jubilee, MI' },
  { name: 'James Bond', address: '654 Depop Dr. Chicago, MI' },
  { name: 'Bill Bowerman', address: '1811 Hill St. Converse, MI' },
  { name: 'Clyde Frazier', address: '3333 Cement Ln. Jordan, MI' },
  { name: 'Jeff Staple', address: '4444 Black Cat Ct. Jordan,MI' },
  { name: 'Sophia Chang', address: '2006 Citrus Rd. Seven, MI' },
];



export class CustomerDataSource extends DataSource<CustomerListItem> {

  data: CustomerListItem[] = EXAMPLE_DATA;
  dataChange = new Subject<null>();
  filter = '';

  constructor(
    public paginator: MatPaginator,
    public sort: MatSort,

    // TODO: activate service when back-end is implemented
    //private CustomerService: CustomerService
  ) {
    super();
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  connect(): Observable<CustomerListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [this.dataChange.asObservable()];
    this.paginator.page,
      this.sort.sortChange
    // Get table data
    //this.getData();
    // Returned merged result of data mutation observables
    //this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        // Get filtered data
        const filteredData = this.getFilteredData([...this.data]);
        // Set the paginator's length
        this.paginator.length = filteredData.length;
        // Return paged/sorted data
        return this.getPagedData(this.getSortedData(filteredData));
      })
    );
  }


  disconnect() {
    // Remove subscriptions
    this.dataChange.unsubscribe();
  }

  /**
   *  Get table data
   */
  // getData(){
  //     this.CustomerService.getCustomers().subscribe((result: Customers []) => {
  //         //set table data
  //         this.data = result;
  //         //call data change subscription
  //         this.dataChange.next(null);

  //     });
  // }

  /**
   *  Get table length
   */
  getLength() {
    // Get length of the current data set
    return this.paginator.length;
  }

  /**
   *  Apply the filter
   */
  applyFilter(filter: string) {
    // Set filters
    this.filter = filter.trim().toLowerCase();
    // Set page back to the first page
    this.paginator.firstPage();
    // Call data change subscription
    this.dataChange.next(null);
  }
  /**
   *  Get filtered table data
   */
  private getFilteredData(data: CustomerListItem[]) {
    // Create filtered data array
    let filteredData = [];
    // Don't filter any data if no filter is set
    if (!this.filter) {
      filteredData = data;
    }


    filteredData = data.filter((customers: CustomerListItem) => {
      return (
        customers.name
          .trim()
          .toLowerCase()
          .indexOf(this.filter) !== -1 ||
        customers.address
          .trim()
          .toLowerCase()
          .indexOf(this.filter) !== -1
      );
    });

    // Return filtered data
    return filteredData;
  }
  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CustomerListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: CustomerListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'address':
          return compare(a.address, b.address, isAsc);

        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}