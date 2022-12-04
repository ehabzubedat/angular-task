import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';
import { Customer } from '../models/customer';

const baseUrl = 'http://localhost:3030';

const httpURL = {
  getAllCustomers: `${baseUrl}/customers`,
  createCustomer: `${baseUrl}/customer/new`,
  deleteCustomer: `${baseUrl}/customer/delete`,
  updateCustomer: `${baseUrl}/customer/update`
}

@Injectable({
  providedIn: 'root'
})
export class GetCustomersService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get(httpURL.getAllCustomers);
  }

  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(httpURL.createCustomer, customer);
  }

  deleteCustomer(_id: Types.ObjectId): Observable<any> {
    return this.http.delete(`${httpURL.deleteCustomer}/${_id}`);
  }

}
