import { TestBed } from '@angular/core/testing';

import { GetCustomersService } from './get-customers.service';

describe('GetCustomersService', () => {
  let service: GetCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
