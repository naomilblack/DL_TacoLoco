import { CustomerDataSource, CustomerListItem } from './customer.datasource';

describe('Customer', () => {
  it('should create an instance', () => {
    expect(new CustomerDataSource()).toBeTruthy();
  });
});
